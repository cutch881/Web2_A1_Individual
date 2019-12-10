// JavaScript File

/*

Author:Mark Carvalho

Sources:

Search text field source: (https://www.youtube.com/watch?v=G1eW3Oi6uoc)
Table Sort Section Source: (https://www.youtube.com/watch?v=QxbJ9b-mpoA)
Chart  Initial Code structure Source(https://www.chartjs.org/docs/latest/)
*/


const url = 'https://www.randyconnolly.com/funwebdev/services/stocks/companies.php';

window.addEventListener('load', function() {

//---------------------------------First (Main) Fetch--------------------------------------------------------------------------------------------    
    fetch(url)

        .then(function(resp) { return resp.json() })

//----------------------Building list-----------------------------------------------------------------------------------------------     
        .then(function(companies) {

            const ul = document.querySelector('#list');


            for (let c of companies) {
                const li = document.createElement('li');
                const span = document.createElement('span');
                const img = document.createElement('img');
                const source = "../logos/" + c.symbol + ".svg";
                img.setAttribute('src', source);


//--------------------------------Styling list-------------------------------------------------------------------------------------------            
                img.style.height = '30px';
                img.style.width = '60px';
                img.style.paddingLeft = "8px";
                img.style.paddingTop = "5px";
                span.style.paddingLeft = "10px";
                li.style.marginTop = "10px";
                li.style.backgroundColor = "#FFFFFF";
                li.style.borderRadius = "10px";

//-----------------------------Aappending for list--------------------------------------------------------------------------------------             
                span.innerHTML = c.symbol;
                ul.appendChild(li);
                li.appendChild(span);
                li.appendChild(img);


//-----------------------------Eventlistner for Company selected-----------------------------------------------------------------------------------------    
                const compInfo = "https://api.iextrading.com/1.0/stock/" + c.symbol + "/company";
                li.addEventListener('click', function() {
                    
                    const chartButton = document.querySelector('#chartView');
                    chartButton.style.display = "block";
//---------------------------------------Second Fetch for JSON------------------------------------------------------------------------------------       
                    fetch(compInfo)

                        .then(function(response) { return response.json() })

                        .then(function(info) {

                            const symbol = document.querySelector('#symbol');
                            const companyName = document.querySelector('#companyName');
                            const exchange = document.querySelector('#exchange');
                            const industry = document.querySelector('#industry');
                            const description = document.querySelector('#description');
                            const ceo = document.querySelector('#ceo');
                            const website = document.querySelector('#website');
                            const sector = document.querySelector('#sector');
                            const tags = document.querySelector('#tags');

                            const sym = info.symbol;
                            const cName = info.companyName;
                            const exc = info.exchange;
                            const ind = info.industry;
                            const des = info.description;
                            const c = info.CEO;
                            const web = info.website;
                            const sec = info.sector;
                            const tag = info.tags;
                            const cImg = document.createElement('img');
                            const imgScr = "../logos/" + info.symbol + ".svg";

                            cImg.setAttribute('src', imgScr);
                            cImg.style.height = "70px";
                            cImg.style.width = "140px";
                            cImg.style.paddingLeft = "60px";
                            symbol.innerHTML = "Symbol: ".bold() + sym;
                            symbol.appendChild(cImg);
                            companyName.innerHTML = "Company Name: ".bold() + cName;
                            exchange.innerHTML = "Exchange: ".bold() + exc;
                            industry.innerHTML = "Industry: ".bold() + ind;
                            description.innerHTML = "Description: ".bold() + des;

                            document.querySelector("#symb").innerHTML = "Symbol: ".bold() + sym;
                            document.querySelector("#nameC").innerHTML = "Company Name: ".bold() + cName;
                            document.querySelector("#compD").innerHTML = "Description: ".bold() + des;

                            if (c == "") {
                                ceo.innerHTML = "CEO:".bold() + "Unknown";
                            }
                            else {
                                ceo.innerHTML = "CEO: ".bold() + c;
                                website.innerHTML = "Website:".bold() + "<a href='" + web + "'>" + web + "</a>";
                            }

                            sector.innerHTML = "Sector: ".bold() + sec;

                            tags.innerHTML = "Tags:".bold();
                            const tagList = document.createElement('ul');
                            tags.appendChild(tagList);

                            for (const t of tag) {
                                const tagLi = document.createElement('li');
                                tagLi.innerHTML = t;
                                tagList.appendChild(tagLi);
                            }

                        });

//---------------------------------------Third Fetch for JSON-----------------------------------------------------------------------------------                             

                    const compQuote = "https://api.iextrading.com/1.0/stock/" + c.symbol + "/quote";
                    fetch(compQuote)

                        .then(function(response1) { return response1.json() })

                        .then(function(quote) {

                            const open = document.querySelector('#open');
                            const close = document.querySelector('#close');
                            const high = document.querySelector('#high');
                            const low = document.querySelector('#low');
                            const week52High = document.querySelector('#week52High');
                            const week52Low = document.querySelector('#week52Low');

                            open.innerHTML = "Open Price: ".bold() + "$" + quote.open + " USD";
                            close.innerHTML = "Close Price: ".bold() + "$" + quote.close + " USD";
                            high.innerHTML = "High: ".bold() + "$" + quote.high + " USD";
                            low.innerHTML = "Low: ".bold() + "$" + quote.low + " USD";
                            week52High.innerHTML = "Week 52 High: ".bold() + "$" + quote.week52High + " USD";
                            week52Low.innerHTML = "Week 52 Low: ".bold() + "$" + quote.week52Low + " USD";

                        });

//---------------------------------------Fourth Fetch for JSON-----------------------------------------------------------------------------------             
                    const compStock = "https://api.iextrading.com/1.0/stock/" + c.symbol + "/chart/1m";
                    fetch(compStock)

                        .then(function(response2) { return response2.json() })

                        .then(function(stock) {

                            const table = document.querySelector('#data');
                            table.style.height ="1100px";
                            table.innerHTML = "";
                            const tRow = document.createElement('tr');
                            const dateHead = document.createElement('th');
                            const openHead = document.createElement('th');
                            const highHead = document.createElement('th');
                            const lowHead = document.createElement('th');
                            const closeHead = document.createElement('th');
                            const volumeHead = document.createElement('th');

                            dateHead.innerHTML = "Date";
                            openHead.innerHTML = "Open";
                            highHead.innerHTML = "High";
                            lowHead.innerHTML = "Low";
                            closeHead.innerHTML = "Close";
                            volumeHead.innerHTML = "Volume";

                            tRow.appendChild(dateHead);
                            tRow.appendChild(openHead);
                            tRow.appendChild(highHead);
                            tRow.appendChild(lowHead);
                            tRow.appendChild(closeHead);
                            tRow.appendChild(volumeHead);
                            table.appendChild(tRow);


                            var monthData = [];
                            var closeData = [];
                            var totalClose = 0;
                            var averageClose = 0;
                            var minClose = 0;
                            var totalVolume = 0;
                            var averageVolume = 0;
                            var count = 0;



                            for (const s of stock) {

                                const tr = document.createElement('tr');
                                const date = document.createElement('td');
                                const open = document.createElement('td');
                                const high = document.createElement('td');
                                const low = document.createElement('td');
                                const close = document.createElement('td');
                                const volume = document.createElement('td');

                                date.innerHTML = s.date;
                                open.innerHTML = s.open.toFixed(2);
                                high.innerHTML = s.high.toFixed(2);
                                low.innerHTML = s.low.toFixed(2);
                                close.innerHTML = s.close.toFixed(2);
                                volume.innerHTML = s.volume;

                                tr.appendChild(date);
                                tr.appendChild(open);
                                tr.appendChild(high);
                                tr.appendChild(low);
                                tr.appendChild(close);
                                tr.appendChild(volume);
                                table.appendChild(tr);

                                count++;
                                if (count == 1) {
                                    minClose = s.close;
                                }
                                else if (minClose > s.close) {
                                    minClose = s.close;
                                }
                                monthData.push(s.date);
                                closeData.push(s.close)
                                totalClose += s.close;
                                averageClose = totalClose / count;
                                totalVolume += s.volume;
                                averageVolume = totalVolume / count;

                            }
                            
                            chartFiller(monthData, closeData);
                            document.querySelector("#averageClose").innerHTML = "Average Close:".bold() + "$" + averageClose.toFixed(2);
                            document.querySelector("#minClose").innerHTML = "Minimum Close:".bold() + "$" + minClose.toFixed(2);
                            document.querySelector("#averageVolume").innerHTML = "Average Volume: ".bold() + averageVolume.toFixed(2);
                            document.querySelector("#totalVolume").innerHTML = "Total Volume: ".bold() + totalVolume.toFixed(2);


//-------------------------------table sort section-------(SOURCE: https://www.youtube.com/watch?v=QxbJ9b-mpoA)-----------------------------------------------------
                            const th = table.getElementsByTagName('th'); //getting th created and passed in

                            for (let c = 0; c < th.length; c++) {

                                th[c].addEventListener('click', item(c));
                            }


                            function item(c) {

                                return function() {
                                    console.log(c);
                                    sortTable(c);
                                };
                            }



                            function sortTable(c) { //functions can be declaire above calling section too
                                //*table* is the global variable of this function//
                                var rows, switching, i, x, y, shouldSwitch;
                                //table = document.getElementById("myTable"); //table is global, so not needed here 
                                switching = true;
                                /*Make a loop that will continue until
                                no switching has been done:*/
                                while (switching) {
                                    //start by saying: no switching is done:
                                    switching = false;
                                    rows = table.rows;
                                    /*Loop through all table rows (except the
                                    first, which contains table headers):*/
                                    for (i = 1; i < (rows.length - 1); i++) {
                                        //start by saying there should be no switching:
                                        shouldSwitch = false;
                                        /*Get the two elements you want to compare,
                                        one from current row and one from the next:*/
                                        x = rows[i].getElementsByTagName("TD")[c];
                                        y = rows[i + 1].getElementsByTagName("TD")[c];
                                        //check if the two rows should switch place:
                                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                                            //if so, mark as a switch and break the loop:
                                            shouldSwitch = true;
                                            break;
                                        }
                                    }
                                    if (shouldSwitch) {
                                        /*If a switch has been marked, make the switch
                                        and mark that a switch has been done:*/
                                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                        switching = true;
                                    }
                                }
                            }

                        });

                });

            }
//---------------------------------------------Search------(SOURCE: https://www.youtube.com/watch?v=G1eW3Oi6uoc--------------------------------------------------------
            const search = document.querySelector('#myInput');
            const all = ul.querySelectorAll('li');

            search.addEventListener('keyup', function() { //keyup is another option
                const filter = search.value.toUpperCase();
                for (let a of all) {
                    const compSymb = a.querySelector('span').textContent.toUpperCase();

                    if (compSymb.indexOf(filter) != -1) { // This works --> if (compSymb.startsWith(filter) == true) 
                        a.style.display = "block";
                    }

                    else {
                        a.style.display = "none";
                    }

                }

            });

        })


        .catch(function(err) {
            console.log(err);
        });
        
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End Of Main Fetch~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//------------------------------For the Credits label---------------------------------------------------------------------------------------------------------------------------------------

    const label = document.querySelector("#credits");

    label.addEventListener('mouseover', function() {
        label.innerHTML = "Data provided for free by " + "<a href='" + "https://iextrading.com/developer/" + "'>IEX</a>" + ". View " +
            "<a href='" + "https://iextrading.com/developer/" + "'>IEX's</a>" + " Terms of Use.";
    });


    label.addEventListener('mouseleave', function() {
        label.innerHTML = "Credits";
    });


//---------------------------------------Chart Initial Code structure Code Source(https://www.chartjs.org/docs/latest/)-------------------------------------------------------------------------------------
   
var myChart;
function chartFiller(labelSet, dataSet) { //functions can be declaire above calling section too
        var ctx = document.getElementById("myChart1").getContext('2d');
        
        if (myChart) 
        {
            myChart.destroy();
        }
        
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelSet,
                datasets: [{
                    label: 'Dollar Amount',
                    data: dataSet,
                    backgroundColor: 'rgb(204, 229, 255)',
                    borderColor: 'rgb(0, 0, 204)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Close Value at Date',
                    fontSize: 20
                },
                scales: {

                    xAxes: [{
                        ticks: {
                            fontSize: 7
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Year-Month-Date',
                            fontSize: 10
                        }
                    }],

                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 7.5
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Dollar Value',
                            fontSize: 10
                        }
                    }]
                }
            }
        });
    }
    
    
//------------------------------------------Chart view Button ------------------------------------------------------
    document.querySelector('#chartView').addEventListener('click', function() {
        document.querySelector('#companyList').style.display = 'none';
        document.querySelector('#companyInfo').style.display = 'none';
        document.querySelector('#companyQuote').style.display = 'none';
        document.querySelector('#companyStockData').style.display = 'none';
        document.querySelector('#chart').style.display = 'block';
        document.querySelector('#infoPanel').style.display = 'block';

    });


//------------------------------------------Close Button ------------------------------------------------------
    document.querySelector('#closeButton').addEventListener('click', function() {
        document.querySelector('#companyList').style.display = 'block';
        document.querySelector('#companyInfo').style.display = 'block';
        document.querySelector('#companyQuote').style.display = 'block';
        document.querySelector('#companyStockData').style.display = 'block';
        document.querySelector('#chart').style.display = 'none';
        document.querySelector('#infoPanel').style.display = 'none';
    });


//------------------------------------------Speak Button ------------------------------------------------------
    document.querySelector("#speak1").addEventListener('click', function() {

        const text = document.querySelector("#nameC").textContent;
        console.log(text);
        speech(text);
    });

//------------------------------------------Speak Button ------------------------------------------------------    

    document.querySelector("#speak2").addEventListener('click', function() {

        const text = document.querySelector("#compD").textContent;
        console.log(text);
        speech(text);
    });



    function speech(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }


});


/*
Sources:

Search text field source: (https://www.youtube.com/watch?v=G1eW3Oi6uoc)
Table Sort Section Source: (https://www.youtube.com/watch?v=QxbJ9b-mpoA)
Chart Initial Code structure Source(https://www.chartjs.org/docs/latest/)
*/
