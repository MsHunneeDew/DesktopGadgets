/*Gets XMLHttpRequest object from an URL and returns it.*/
function loadXMLtoDoc(urlToXML)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",urlToXML,false);
    xhttp.send();
    return xhttp.responseXML;
}

/*Takes a XMLHttpRequest object and writes stuff to the document.*/
function showXML(xmlDoc)
{
    if(xmlDoc !== null)
    {
        var pubDate = xmlDoc.getElementsByTagName("pubDate");
        /*for (var i=0;i<title.length;i++)
        { */
            document.getElementById('snips').innerHTML = pubDate[0].childNodes[0].nodeValue;
            /*document.getElementById('snips').innerHTML = "<br />";
        }*/
        
        document.getElementById('oops').innerHTML = "Something happened!";
    }
    else
    {
        document.getElementById('oops').innerHTML = "Nope!";
    }
}

/*Runs the show.*/
function getXML(urlToXML)
{
    var xmlDoc = loadXMLtoDoc(urlToXML);
    showXML(xmlDoc);
}



/* ******************* Stuff I'm not using. ************************** */

/*Unclear- writes to XML object?*/
function loadXMLString(txt) 
{
if (window.DOMParser)
  {
  parser=new DOMParser();
  xmlDoc=parser.parseFromString(txt,"text/xml");
  }
else // Internet Explorer
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async="false";
  xmlDoc.loadXML(txt); 
  }
return xmlDoc;
}