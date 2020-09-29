function handleClick(state){
  if (state == 1){
    if (this.innerHTML == "Marking"){
      this.innerHTML = "Unmarked";
      //CODE TO AFFECT DATABASE ADDED HERE
    }else{
      this.innerHTML = "Marking";
      //CODE TO AFFECT DATABASE ADDED HERE
    }
  }else{
    if (this.innerHTML == "Marking"){
      this.innerHTML = "Free";
      //CODE TO AFFECT DATABASE ADDED HERE
    }else{
      this.innerHTML = "Marking";
      //CODE TO AFFECT DATABASE ADDED HERE
    }
  }
}

function CreateTableFromJSON(state) {
    /*For getting data from server
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = myObj.name;
        }
        };
        xmlhttp.open("GET", "json_demo.txt", true);
        xmlhttp.send(); 
    */

   /*DUMMY PROCEDURE OF GETTING DATA FROM LOCAL FILE*/
    // var myData = JSON.parse(Assignments);

     var emulatorValues = [{"emulatorId":1,"status":"0","assignmentID":"N/a"},{"emulatorId":2,"status":"1","assignmentID":8},{"emulatorId":3,"status":"1","assignmentID":4},{"emulatorId":4,"status":"0","assignmentID":"N/a"},{"emulatorId":5,"status":"1","assignmentID":3},{"emulatorId":6,"status":"0","assignmentID":"N/a"}];

    var assignmentValues = [
        {
          "assignmentID": 1,
          "assignmentName": "Lab 3",
          "status": "0",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 2,
          "assignmentName": "Lab 2",
          "status": "0",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 3,
          "assignmentName": "Lab 3",
          "status": "1",
          "priorityClass": 3,
          "assessor": "Dr Klein"
        },
        {
          "assignmentID": 4,
          "assignmentName": "Lab 2",
          "status": "1",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 5,
          "assignmentName": "Test 2",
          "status": "0",
          "priorityClass": 3,
          "assessor": "Dr Klein"
        },
        {
          "assignmentID": 6,
          "assignmentName": "Lab 3",
          "status": "0",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 7,
          "assignmentName": "Test 1",
          "status": "0",
          "priorityClass": 3,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 8,
          "assignmentName": "Test 1",
          "status": "1",
          "priorityClass": 1,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 9,
          "assignmentName": "Lab 2",
          "status": "0",
          "priorityClass": 5,
          "assessor": "Dr Klein"
        },
        {
          "assignmentID": 10,
          "assignmentName": "Lab 3",
          "status": "0",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 11,
          "assignmentName": "Lab 3",
          "status": "0",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        }
      ]
      ;

      //BASED ON WHICH PAGE IS ACCESSED THE STATE DECIDES WHICH JSON TABLE TO RETRIEVE AND READ
    if(state == 1){
      //var values = require('AssignmentTable.json');
      var values = assignmentValues;
    }else{
      //  var request = new XMLHttpRequest();
      //  request.open("GET","EmulatorTable.json",false);
      //  request.send(null);
      //  var values = JSON.parse(request.responseText);
       var values = emulatorValues;
    }

    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < values.length; i++) {
        for (var key in values[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.
    var stat = -1;                                  // STATUS COLUMN VALUE

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        if (th.innerHTML == "status"){
          stat = i;
        }
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < values.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (j != stat){
              tabCell.innerHTML = values[i][col[j]];
            }else{
              if (state == 1){ //STATE IS MATTER OF ASSIGNMENT PAGE AGAINST EMULATOR PAGE
                if (values[i][col[j]] ==  0){ //CHECKS STATUS OF SPECIFIC ENTRY
                   tabCell.innerHTML = '<button class = "button" onclick="handleClick.call(this,1);">Unmarked</>';    //State value being passed as raw value as variable is considered undeclared
                }else{
                  tabCell.innerHTML = '<button class = "button" onclick="handleClick.call(this,1);">Marking</>';
                }
              }else{
                if (values[i][col[j]] ==  0){
                  tabCell.innerHTML = '<button class = "button" onclick="handleClick.call(this,2);">Free</>';
               }else{
                 tabCell.innerHTML = '<button class = "button" onclick="handleClick.call(this,2);">Marking</>';
               }
              }
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}