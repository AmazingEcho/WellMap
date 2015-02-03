protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["Method"] == "GetServerDate")
            {
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                GetServerDate(Request.QueryString["format"]);
            }
        }
 
        private void GetServerDate(string dateformat)
        {
            Response.Clear();
            if (dateformat.Equals("utc"))
            {
                Response.Write(DateTime.Now.ToUniversalTime().ToString());
            }
            else
            {
                Response.Write(DateTime.Now.ToLocalTime().ToString());
            }
            Response.End();
        }
