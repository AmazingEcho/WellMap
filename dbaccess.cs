using System.Data.SQLClient

class database(){

static void initialize_connection(){
  SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
  
try{
  myConnection.Open();
}
catch(Exception e){
  Console.WriteLine(e.ToString());
}
return 0;
}

void close_connection(){
   SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   
try{
myConnection.Close();
}
catch(Exception e){
Console.WriteLine(e.ToString());
}
return 0;
}
