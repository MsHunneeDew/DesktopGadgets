/*Gets the pubDate's from the show's rss feed and compares it to today's date. Returns true if there is a newer than one week ago and false if not.*/
function compareDates(xmlFeedDoc)
{
    var isNew = false;
    
    var rightNow = new Date(); //right now
    var today = [rightNow.getDay(), rightNow.getMonth(), rightNow.getDate(), rightNow.getFullYear()]; //Day of week, Month, Day, Year
    
    var pubDates = xmlDoc.getElementsByTagName("pubDate");
    var aDate, aPubDate;
    for(var index = 0; index < pubDate.length; index++)
    {
        aDate = pubDates[index].childNodes[0].nodeValue;
        aPubDate = [aDate.getDay(), aDate.getMonth(), aDate.getDate(), aDate.getFullYear()];
    }
    
    return isNew;
}

/*Gets XMLHttpRequest object from an URL and calls compareDates() to process it. Returns true or false based on what compareDates() returns*/
function loadRSSFeedXml(urlToRssFeed) //WORKING HERE
{
    if(urlToRssFeed !== "STUBBED")
    {
        try
        {
            var xhttp;
            if (window.XMLHttpRequest)
            {
                xhttp=new XMLHttpRequest();
            }
            else
            {
                xhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhttp.open("GET",urlToRssFeed,true);
            xhttp.onreadystatechange=function()
            {
                if (xhttp.readyState==4 && xhttp.status==200)
                {
                    return compareDates(xhttp.responseXML); //returns true or false
                }            
            };
            xhttp.send();
        }
        catch(error)
        {
            var errorReturn = false;
            return errorReturn;
        }
    }
    else
    {
        var stubbedReturn = false;
        return stubbedReturn;
    }
}

/*Checks to see if there are new shows. Returns text to place in html page. -UNFINISHED*/
function checkForNewShow(urlToRssFeed)
{
    var isNew = loadRSSFeedXml(urlToRssFeed);
    if(isNew)
    {
        text = "!";
    }
    else
    {
        text = "<br />";
    }     
    return text;
}

/*Builds list of shows from shows.xml and write it to the html page inside the tag with the id of 'gadgetContent'.*/
function buildList(xmlDoc)
{
    var htmlText = "";
        
        //Open Table
        htmlText = htmlText.concat('<table>');
        
        //Table header row
        htmlText = htmlText.concat('<tr class="heading"><td>Show</td><td>Day &amp; Time</td><td>Site <i>(Network)</i></td><td class="new">NEW!</td></tr>');
        
        //Iterate thru shows and put information into the table.
        try 
        {   
            var showList = xmlDoc.getElementsByTagName("show"); 
            for (var showIndex = 0; showIndex < showList.length; showIndex++)
            {
                //Start table row.
                htmlText = htmlText.concat('<tr>');
                //Show title and url to watch it at.
                htmlText = htmlText.concat('<td><a href="', showList[showIndex].getElementsByTagName("urlToWatchShow")[0].firstChild.nodeValue,'" target="_blank">', showList[showIndex].getElementsByTagName("title")[0].firstChild.nodeValue, '</a></td>');
                //Day and time of show.
                htmlText = htmlText.concat('<td>', showList[showIndex].getElementsByTagName("day")[0].firstChild.nodeValue, ' -', showList[showIndex].getElementsByTagName("time")[0].firstChild.nodeValue, '</td>');
                //Site I watch the show at, network it original aired on, and link to the network's show page.
                htmlText = htmlText.concat('<td>', showList[showIndex].getElementsByTagName("siteWatchedAt")[0].firstChild.nodeValue, '<i><a href="', showList[showIndex].getElementsByTagName("urlToNetworkShowPage")[0].firstChild.nodeValue, '" target="_blank"> (', showList[showIndex].getElementsByTagName("network")[0].firstChild.nodeValue, ')</a></i></td>');
                //Place to indicate new show
                htmlText = htmlText.concat('<td>', checkForNewShow(showList[showIndex].getElementsByTagName("urlToRssFeed")[0].firstChild.nodeValue),'</td>');
                //End table row.
                htmlText = htmlText.concat('</tr>');
            }
        }
        catch(error)
        {
            htmlText = htmlText.concat('<tr><td>Something&apos;s wrong.</td><td>', error,'</td><td></td><td></td></tr>');
        }
                
        //CloseTable
        htmlText = htmlText.concat('</table>');

    //Write everything into the webpage inbetween the div tags for the gadget.
    document.getElementById('gadgetContent').innerHTML = htmlText;    
}

/*Gets XMLHttpRequest object from an URL and calls buildList() to process it.*/
function loadShowXML(urlToXML)
{
    var xhttp;
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",urlToXML,true);
    xhttp.onreadystatechange=function()
    {
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            buildList(xhttp.responseXML);
        }            
    };
    xhttp.send();
}