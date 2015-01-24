using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;

public partial class Data_Product : System.Web.UI.Page
{
	private string connectionString = @"Data Source=localhost\sqlexpress;AttachDbFilename=""C:\SQL Server 2000 Sample Databases\NORTHWND.MDF"";Integrated Security=True";
	protected override void Render(HtmlTextWriter writer)
	{
		// 1. Initialize XML Response
		Response.ContentType = "text/xml";
		if (Request.HttpMethod.ToUpper() == "GET")
		{
			// 2. Open connection & Create command
			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				using (SqlCommand command = connection.CreateCommand())
				{
					// Select all by default (Unless there is an ID)
					command.CommandText = "SELECT * FROM Products";
					if (Request["ID"] != null) {
						try {
							// Fetch ID (sanitized to prevent SQL injection)
							command.CommandText = String.Format(
								"SELECT * FROM Products WHERE ProductID = {0}",
								Int32.Parse(Request["ID"]));
						} catch {};
					}
					// 3. Format XML as needed
					// - Use <Products> as document element
					// - Use <Product> as the record name
					DataSet set = new DataSet("Products");
					set.Tables.Add(new DataTable("Product"));
					DataTable table = set.Tables[0];
					try
					{
						// 4. Get Database content into DataTable
						connection.Open();
						SqlDataReader reader = command.ExecuteReader();
						table.Load(reader, LoadOption.Upsert);
					} catch (Exception ex) {
						// Handle exception 
						writer.WriteLine(@"<Error>" + ex.Message + "</Error>");
					}
					// 5. Render XML Output
					table.WriteXml(writer);
				}
			}
		}
	}
}
