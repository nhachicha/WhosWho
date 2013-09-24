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

import java.util.Collections;
import java.util.List;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MenuItem.OnMenuItemClickListener;
import android.view.View;
import android.widget.ProgressBar;
import dev.nhachicha.whoswho.model.Employee;
import dev.nhachicha.whoswho.ui.TitlesFragment;

public class MainActivity extends FragmentActivity implements
		MyApplication.RefreshListener {
	private TitlesFragment mFrag;
	private ProgressBar mProgress;
	private MenuItem mItemRefresh;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.fragment_layout);
		mProgress = (ProgressBar) findViewById(R.id.progress);
		mFrag = (TitlesFragment) getSupportFragmentManager().findFragmentById(
				R.id.titles);
	}

	@Override
	protected void onResume() {
		super.onResume();
		MyApplication.register(this);
		if (MyApplication.TAB_EMPLOYEES.isEmpty()) {
			requestUpdate();

		} else {
			// make sure the UI is in consistent state
			mProgress.setVisibility(View.GONE);
			if (null != mItemRefresh) {
				mItemRefresh.setEnabled(true);
			}
			mFrag.refresh(MyApplication.TAB_EMPLOYEES);
		}
	}

	@Override
	protected void onStop() {
		super.onStop();
		MyApplication.unregister(this);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		mItemRefresh = menu.findItem(R.id.action_refresh);

		mItemRefresh.setOnMenuItemClickListener(new OnMenuItemClickListener() {

			@Override
			public boolean onMenuItemClick(MenuItem item) {
				requestUpdate();
				return false;
			}
		});
		return true;
	}

	private void requestUpdate() {
		// Invalidate the cache
		MyApplication.TAB_EMPLOYEES = Collections.emptyList();
		if (null != mItemRefresh) {
			mItemRefresh.setEnabled(false);
		}
		mProgress.setVisibility(View.VISIBLE);
		MyApplication.refresh();
	}

	@Override
	public void update(final List<Employee> employees) {
		// this will be accessed from a different Thread, so make sure we run on
		// UiThread
		runOnUiThread(new Runnable() {

			@Override
			public void run() {
				if (null != mItemRefresh) {
					mItemRefresh.setEnabled(true);
				}
				mProgress.setVisibility(View.GONE);
				mFrag.refresh(employees);
			}
		});

	}

}
