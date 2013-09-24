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

package dev.nhachicha.whoswho.model;

import java.util.Collections;
import java.util.List;

import android.content.Context;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import dev.nhachicha.whoswho.R;
import dev.nhachicha.whoswho.utils.Constants;

public class EmployeesAdapter extends BaseAdapter {
	private List<Employee> employees = Collections.emptyList();
	private final Context context;

	public EmployeesAdapter(Context ctx) {
		context = ctx;
	}

	public void updateEmployees(List<Employee> freshEmployees) {// This should
																// be accessed
																// only from
																// UiThread
		employees = freshEmployees;
		notifyDataSetChanged();
	}

	@Override
	public int getCount() {
		return employees.size();
	}

	@Override
	public Employee getItem(int idx) {
		return employees.get(idx);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {

		ImageView employeePhoto;
		TextView employeeName;
		TextView employeeTitle;
		if (convertView == null) {
			convertView = LayoutInflater.from(context).inflate(
					R.layout.employee_list_item, parent, false);
			employeePhoto = (ImageView) convertView.findViewById(R.id.icon)
					.findViewById(R.id.imgEmployee);
			employeeName = (TextView) convertView
					.findViewById(R.id.nameEmployee);
			employeeTitle = (TextView) convertView
					.findViewById(R.id.titleEmployee);
			convertView.setTag(new ViewHolder(employeePhoto, employeeName,
					employeeTitle));

		} else {
			ViewHolder viewHolder = (ViewHolder) convertView.getTag();
			employeePhoto = viewHolder.employeePhoto;
			employeeName = viewHolder.employeeName;
			employeeTitle = viewHolder.employeeTitle;
		}

		Employee employee = getItem(position);

		Picasso.with(context)
				.load(new StringBuilder(Constants.BASE_URL)
						.append(Constants.SERVICE_PATH)
						.append(employee.getPhoto()).toString())
				.placeholder(R.drawable.place_holder).error(R.drawable.warning)
				.resize(100, 100).centerCrop().into(employeePhoto);

		employeeName.setText(Html.fromHtml(employee.getName()));
		employeeTitle.setText(employee.getTitle());

		return convertView;
	}

	private static class ViewHolder {
		public final ImageView employeePhoto;
		public final TextView employeeName;
		public final TextView employeeTitle;

		public ViewHolder(ImageView photo, TextView name, TextView title) {
			this.employeePhoto = photo;
			this.employeeName = name;
			this.employeeTitle = title;
		}
	}

}
