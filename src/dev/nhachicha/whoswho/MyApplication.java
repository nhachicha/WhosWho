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

package dev.nhachicha.whoswho;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import android.app.Application;
import dev.nhachicha.whoswho.io.ReadStream;
import dev.nhachicha.whoswho.model.Employee;
import dev.nhachicha.whoswho.xml.StreamParser;

public class MyApplication extends Application {
	public interface RefreshListener {
		void update(final List<Employee> employees);
	}

	public static List<Employee> TAB_EMPLOYEES = Collections.emptyList();
	private static List<RefreshListener> observers = new ArrayList<RefreshListener>();

	public static void register(RefreshListener observer) {
		observers.add(observer);
	}

	public static void unregister(RefreshListener observer) {
		observers.remove(observer);
		if (null != task && task.isAlive()) {
			task.interrupt();
		}
	}

	public static void refresh() {
		if (null == task || !task.isAlive()) {
			task = new LoadStream();
			task.start();
		}

	}

	private static void notifyObservers() {
		for (RefreshListener observer : observers) {
			observer.update(TAB_EMPLOYEES);
		}
	}

	@Override
	public void onCreate() {
		super.onCreate();
		// we don't cache any values, so whenever the App context get's
		// destroyed we grab a fresh list

	}

	private static LoadStream task = null;

	static class LoadStream extends Thread {
		public LoadStream() {
			super("blade_runner");
		}

		@Override
		public void run() {

			try {
				InputStream input = ReadStream.get();
				StreamParser parser = new StreamParser(input);
				TAB_EMPLOYEES = parser.parseData();

				notifyObservers();

			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

}
