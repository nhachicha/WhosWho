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

package dev.nhachicha.whoswho.io;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import com.squareup.okhttp.OkHttpClient;

import dev.nhachicha.whoswho.utils.Constants;

public class ReadStream {
	private static OkHttpClient CLIENT = new OkHttpClient();
	
	public static InputStream get () throws Exception {
		StringBuilder builder = new StringBuilder();
		builder.append(Constants.BASE_URL).append(Constants.SERVICE_PATH);
		URL url = new URL(builder.toString());
		
		HttpURLConnection connection = CLIENT.open(url);
	    return connection.getInputStream();
	    
	}
}
