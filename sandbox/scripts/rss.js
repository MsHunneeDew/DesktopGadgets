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
        var text = "";
        
        /*Works. Gets all pubDate tag values and displays one on each line.*/
        var pubDate = xmlDoc.getElementsByTagName("pubDate");
        for(var i = 0; i < pubDate.length; i++)
        {
            text = text.concat(pubDate[i].childNodes[0].nodeValue, "<br />");
        }    
        
        document.getElementById('snips').innerHTML = text;
        document.getElementById('txtCDInfo').innerHTML = "";
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


/* ******************* Stuff I'm not going to use. ************************** */

/* Does nothing. Using as a clipboard. */
function junkSnips()
{
    //string.concat(string2, string3, ..., stringX)
    
    var channel = xmlDoc.getElementsByTagName("channel")[0];
        var channelChild = channel.firstChild;
        while (channelChild.nodeType!=1)
        {
            text = text + channelChild.nodeName;
            text = text + "<br />";
            channelChild = channelChild.nextSibling;
        }
        
    //nodeName
    
    var node = xmlDoc.documentElement.childNodes;
        for (i=0;i < node.length;i++)
        {
            text = text + node[i].nodeName + ": ";
            //text = text + node[i].childNodes[0].nodeValue + "<br />";
        }
    
    /*
        var channels = xmlDoc.getElementsByTagName("channel");
        for(var i=0; i<channels.length;i++)
        {
            text = text + channels[i].nodeValue + "<br />";
        }
        */
        
    var pubDate = xmlDoc.getElementsByTagName("pubDate");
        /*for (var i=0;i<title.length;i++)
        { */
            document.getElementById('snips').innerHTML = pubDate[0].childNodes[0].nodeValue;
            /*document.getElementById('snips').innerHTML = "<br />";
        }*/
}

function loadXMLDoc(url)
{
    var xmlhttp;
    var txt,x,xx,i;
    if (window.XMLHttpRequest)
        {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
    else
        {
            // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    txt="<table border='1'><tr><th>Title</th><th>Artist</th></tr>";
                    x=xmlhttp.responseXML.documentElement.getElementsByTagName("CD");
                    for (i=0;i<x.length;i++)
                        {
                            txt=txt + "<tr>";
                            xx=x[i].getElementsByTagName("TITLE");

                            try
                                {
                                txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                                }
                            catch (er)
                                {
                                txt=txt + "<td> </td>";
                                }
                            
                            xx=x[i].getElementsByTagName("ARTIST");
                            
                            try
                                {
                                txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                                }
                            catch (er2)
                                {
                                txt=txt + "<td> </td>";
                                }

                            txt=txt + "</tr>";
                        }
                txt=txt + "</table>";
                document.getElementById('txtCDInfo').innerHTML=txt;
                
                document.getElementById('snips').innerHTML = "";        
                document.getElementById('oops').innerHTML = "Something happened!";
            }
        };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}



/* ******************* Broken Stuff. ************************** */

/*more dynamic? */
function showRSS(RSS)
{
    var imageTag = "<img id='chan_image'";
    var startItemTag = "<div id='item'>";
    var startTitle = "<div id='item_title'>";
    var startLink = "<div id='item_link'>";
    var startDescription = "<div id='item_description'>";
    var endTag = "</div>";

    var properties = [title, link, description, pubDate, copyright];
        
    var i;
    for (i=0; i<properties.length; i++)
    {
        document.getElementById('chan_"+properties[i]+"').innerHTML = '';
        curProp = "RSS."+properties[i];
        if (curProp !== null)
            document.getElementById('chan_"+properties[i]+"').innerHTML = curProp;
    }

    /*show the image*/
    document.getElementById("chan_image_link").innerHTML = "";
    if (RSS.image.src !== null)
    {
        document.getElementById("chan_image_link").href = RSS.image.link; /*C1*/
        document.getElementById("chan_image_link").innerHTML = imageTag + " alt='"+RSS.image.description + "' width='"+RSS.image.width +
                                                                "' height='"+RSS.image.height + "' src='"+RSS.image.url +"' "+"/>";
    }

    document.getElementById("chan_items").innerHTML = "";
    for (i=0; i<RSS.items.length; i++)
    {
        item_html = startItemTag;
        item_html += (RSS.items[i].title === null) ? "" : startTitle + RSS.items[i].title + endTag;
        item_html += (RSS.items[i].link === null) ? "" : startLink + RSS.items[i].link + endTag;
        item_html += (RSS.items[i].description === null) ? "" : startDescription + RSS.items[i].description + endTag;
        item_html += endTag;
        document.getElementById("chan_items").innerHTML += item_html;
    }
    //document.getElementById("oops").innerHTML="Nope";
    return true;
}

function RSS2Source(souElement)
{
    if (souElement === null) {
        this.url = null;
        this.value = null;
    } else {
        this.url = souElement.getAttribute("url");
        this.value = souElement.childNodes[0].nodeValue;
    }
}

function RSS2Guid(guidElement)
{
    if (guidElement === null) {
        this.isPermaLink = null;
        this.value = null;
    } else {
        this.isPermaLink = guidElement.getAttribute("isPermaLink");
        this.value = guidElement.childNodes[0].nodeValue;
    }
}

function RSS2Enclosure(encElement)
{
    if (encElement === null) {
        this.url = null;
        this.length = null;
        this.type = null;
    } else {
        this.url = encElement.getAttribute("url");
        this.length = encElement.getAttribute("length");
        this.type = encElement.getAttribute("type");
    }
}

function RSS2Category(catElement)
{
    if (catElement === null) {
        this.domain = null;
        this.value = null;
    } else {
        this.domain = catElement.getAttribute("domain");
        this.value = catElement.childNodes[0].nodeValue;
    }
}

function RSS2Item(itemxml)
{
    /*required properties (strings)*/
    var title = this.title;
    var link = this.link;
    var description = this.description;

    /*optional properties (strings)*/
    var author = this.author;
    var comments = this.comments;
    var pubDate = this.pubDate;

    /*optional properties (objects)*/
    var category = this.category;
    var enclosure = this.enclosure;
    var guid = this.guid;
    var source = this.source;

    var properties = [title, link, description, author, comments, pubDate];
    var tmpElement = null;
    for (var i=0; i<properties.length; i++)
    {
        tmpElement = itemxml.getElementsByTagName(properties[i])[0];
        if (tmpElement !== null && tmpElement !== "")
            properties[i] = tmpElement.childNodes[0].nodeValue;
    }

    this.category = new RSS2Category(itemxml.getElementsByTagName("category")[0]);
    this.enclosure = new RSS2Enclosure(itemxml.getElementsByTagName("enclosure")[0]);
    this.guid = new RSS2Guid(itemxml.getElementsByTagName("guid")[0]);
    this.source = new RSS2Source(itemxml.getElementsByTagName("source")[0]);
}

function RSS2Image(imgElement)
{
    if (imgElement === null) {
    this.url = null;
    this.link = null;
    this.width = null;
    this.height = null;
    this.description = null;
    } else {
        imgAttribs = [url, title, link, width, height, description];
        for (var i=0; i<imgAttribs.length; i++)
            if (imgElement.getAttribute(imgAttribs[i]) !== null)
                this.imgAttribs[i] =imgElement.getAttribute("+imgAttribs[i]+");
    }
}

function RSS2Channel(rssxml)
{

    /*required string properties*/
    var title = this.title;
    var link = this.link;
    var description = this.description;

    /*optional string properties*/
    var language = this.language;
    var copyright = this.copyright;
    var managingEditor = this.managingEditor;
    var webMaster = this.webMaster;
    var pubDate = this.pubDate;
    var lastBuildDate = this.lastBuildDate;
    var generator = this.generator;
    var doc = this.docs;
    var ttle = this.ttl;
    var rating = this.rating;

    /*optional object properties*/
    var category = this.category;
    var image = this.image;

    /*array of RSS2Item objects*/
    var items; //= new Array();/*
/*document.getElementById('oops').innerHTML="Nope!";*/

    var chanElement = rssxml.getElementsByTagName("channel")[0];
    var itemElements = rssxml.getElementsByTagName("item");
    
    var i;
    for (i=0; i<itemElements.length; i++)
    {
        Item = new RSS2Item(itemElements[i]);
        items.push(Item);
    }
    
    var properties = [title, link, description, language, copyright, managingEditor, webMaster, pubDate, lastBuildDate, generator, docs, ttl, rating];
    var tmpElement = null;
    for (i=0; i<properties.length; i++)
    {
        tmpElement = chanElement.getElementsByTagName(properties[i])[0];
        if (tmpElement!== null)
            this.properties[i] = tmpElement.childNodes[0].nodeValue;
    }

    this.category = new RSS2Category(chanElement.getElementsByTagName("category")[0]);
    this.image = new RSS2Image(chanElement.getElementsByTagName("image")[0]);
}

function processRSS(rssxml)
{
    RSS = new RSS2Channel(rssxml);
    showRSS(RSS);
}

function getRSS(url)
{
    if (window.ActiveXObject) //IE
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else if (window.XMLHttpRequest) //other
        xhr = new XMLHttpRequest();
    else
        alert("your browser does not support AJAX");

    xhr.open("GET",url,true);

    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Pragma", "no-cache");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
        {
            if (xhr.status == 200)
            {
                if (xhr.responseText !== null)
                {
                    processRSS(xhr.responseXML);
                }
                else
                {
                    alert("Failed to receive RSS file from the server - file not found.");
                    return false;
                }
            }
            else
                alert("Error code " + xhr.status + " received: " + xhr.statusText);
        }
    };

    xhr.send(null);
}