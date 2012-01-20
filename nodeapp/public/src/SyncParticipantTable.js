//http://code.google.com/apis/spreadsheets/data/3.0/developers_guide.html#ListFeeds
//<entry xmlns="http://www.w3.org/2005/Atom"
//    xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">
//  <gsx:hours>1</gsx:hours>
//  <gsx:ipm>1</gsx:ipm>
//  <gsx:items>60</gsx:items>
//  <gsx:name>Elizabeth Bennet</gsx:name>
//</entry>

//POST https://spreadsheets.google.com/feeds/list/key/worksheetId/private/full
//
//In the body of the POST request, place the Atom <entry> element you created above, using the application/atom+xml content type.