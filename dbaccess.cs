using System.Data.SQLClient
using System

public Struct WellInfo{
  int wellKey;
  int wellGroup;
  string wellName;
  string wellType;
  double latitude;
  double longitude;
  int wellCapacity;
  int wellOutput;
}

//supports 100 wells, can be changed
WellInfo wellsInDatabase[100];

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

static void add_new(int wellGroup, string wellname, string welltype, double latitude, double longitude, int wellCapacity, int wellOutput){
  
   SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   SQLCommand myCommand = new SQLCommand("INSERT into wells (wellGroup, wellName, wellType, lat, lng, wellCapacity, wellOutput")" +
    "Values('wellgroup', 'wellname', 'welltype', latitude, longitude, wellCapacity, wellOutput)", myConnection);
    try{
      myCommand.ExecuteNonQuery();
    }
    catch (Exception e){
      Console.WriteLine(e.ToString());
    }
    return 0;
}

static void read_data(){
   SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   try{
     SQLDataReader myReader = null;
     SQLCommand = new SQLCommand("select * from wells", myConnection);
     myReader = myCommand.ExecuteReader();
     int counter = 0;
     while(myReader.Read(){
       wellsInDatabase[counter].wellKey = myReader["wellKey"].GetInt16();
       wellsInDatabase[counter].wellGroup = myReader["wellGroup"].GetInt16();
       wellsInDatabase[counter].wellName = myReader["wellName"].ToString();
       wellsInDatabase[counter].wellType = myReader["wellType"].ToString();
       wellsInDatabase[counter].latitude = myReader["lat"].GetInt16();
       wellsInDatabase[counter].longitude = myReader["lng"].GetInt16();
       wellsInDatabase[counter].wellCapacity = myReader["wellCapacity"].getInt16();
       wellsInDatabase[counter].wellOutput = myReader["wellOutput"].getInt16();
     }
   }
   Catch (Exception e){
     Console.WriteLine(e.ToString());
   }
   return 0;
}

static void update_well(int workingWellKey, int newWellGroup, string newWellname, string newWelltype, double newLatitude, double newLongitude, int newWellCapacity, int newWellOutput){
  SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
  SQLCommand myCommand = new SQLCommand("UPDATE wells SET wellGroup = newWellGroup, wellName = newWellName, wellType = newWellType, lat = newLatitude, lng = newLongitude, wellCapacity = newWellCapacity, wellOutput = newWellOutput" +
      "WHERE wellKey == workingWellKey", myConnection);
    try{
      myCommand.ExecuteNonQuery();
    }
    catch (Exception e){
      Console.WriteLine(e.ToString());
    }
    return 0;
}

static void close_connection(){
   SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   
  try{
  myConnection.Close();
  }
  catch(Exception e){
  Console.WriteLine(e.ToString());
  }
  return 0;
}

}
