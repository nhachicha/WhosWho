/*
 * Copyright 2013 Nabil HACHICHA

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

package dev.nhachicha.whoswho.xml;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.htmlcleaner.CleanerProperties;
import org.htmlcleaner.DomSerializer;
import org.htmlcleaner.HtmlCleaner;
import org.htmlcleaner.TagNode;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import dev.nhachicha.whoswho.model.Employee;

public class StreamParser {
	private final static String XPATH_PHOTOS = "//div[starts-with(@class, 'threecol profile')]/img[starts-with(@class, 'attachment')]/@src";
	private final static String XPATH_NAMES = "//div[starts-with(@class, 'threecol profile')]/h3[1]/text()";
	private final static String XPATH_TITLES = "//div[starts-with(@class, 'threecol profile')]/h3[2]/text()";
	private final static String XPATH_BIO = "//div[starts-with(@class, 'threecol profile')]/p";

	private InputStream input;

	public StreamParser(InputStream in) {
		input = in;
	}

	public List<Employee> parseData() throws Exception {
		List<Employee> employees = null;

		// Clean malformated HTML before parsing it
		HtmlCleaner cleaner = new HtmlCleaner();
		CleanerProperties props = cleaner.getProperties();
		props.setAllowHtmlInsideAttributes(true);
		props.setOmitHtmlEnvelope(true);
		props.setOmitUnknownTags(true);
		props.setOmitDoctypeDeclaration(true);
		props.setAllowMultiWordAttributes(true);
		props.setRecognizeUnicodeChars(true);
		props.setOmitComments(true);
		props.setOmitXmlDeclaration(true);

		TagNode tagNode = new HtmlCleaner().clean(input);
		Document document = new DomSerializer(props).createDOM(tagNode);
		XPath xpath = XPathFactory.newInstance().newXPath();

		NodeList photosNodes = (NodeList) xpath.evaluate(XPATH_PHOTOS,
				document, XPathConstants.NODESET);
		NodeList namesNodes = (NodeList) xpath.evaluate(XPATH_NAMES, document,
				XPathConstants.NODESET);
		NodeList titlesNodes = (NodeList) xpath.evaluate(XPATH_TITLES,
				document, XPathConstants.NODESET);
		NodeList biosNodes = (NodeList) xpath.evaluate(XPATH_BIO, document,
				XPathConstants.NODESET);

		// elements should have the same size
		if (null != photosNodes
				&& null != namesNodes
				&& null != titlesNodes
				&& null != biosNodes
				&& ((photosNodes.getLength() == namesNodes.getLength())
						&& (namesNodes.getLength() == titlesNodes.getLength()) && (titlesNodes
						.getLength() == biosNodes.getLength()))) {

			int nbEmployees = photosNodes.getLength();
			employees = new ArrayList<Employee>(nbEmployees);
			Employee employee = null;

			for (int i = 0; i < nbEmployees; i++) {
				employee = new Employee();
				employee.setPhoto(photosNodes.item(i).getNodeValue());
				employee.setName(namesNodes.item(i).getNodeValue());
				employee.setTitle(titlesNodes.item(i).getNodeValue());
				employee.setBiography(biosNodes.item(i).getFirstChild()
						.getNodeValue());

				employees.add(employee);
			}

		} else {
			// error parsing data
			// TODO throw a checked exception here
		}

		return employees;
	}

}
