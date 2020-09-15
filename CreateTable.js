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

   /*dummy procedure of getting data from local file*/
//    var fr = new FileReader();
//    fr.readAsBinaryString(AssignmentTable);

    var emulatorValues = [{"emulatorId":1,"status":"free","assignmentID":"N/a"},{"emulatorId":2,"status":"marking","assignmentID":8},{"emulatorId":3,"status":"marking","assignmentID":4},{"emulatorId":4,"status":"free","assignmentID":"N/a"},{"emulatorId":5,"status":"marking","assignmentID":3},{"emulatorId":6,"status":"free","assignmentID":"N/a"}];

    var assignmentValues = [
        {
          "assignmentID": 1,
          "assignmentName": "Lab 3",
          "status": "unmarked",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 2,
          "assignmentName": "Lab 2",
          "status": "unmarked",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 3,
          "assignmentName": "Lab 3",
          "status": "marking",
          "priorityClass": 3,
          "assessor": "Dr Klein"
        },
        {
          "assignmentID": 4,
          "assignmentName": "Lab 2",
          "status": "marking",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 5,
          "assignmentName": "Test 2",
          "status": "unmarked",
          "priorityClass": 3,
          "assessor": "Dr Klein"
        },
        {
          "assignmentID": 6,
          "assignmentName": "Lab 3",
          "status": "unmarked",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 7,
          "assignmentName": "Test 1",
          "status": "unmarked",
          "priorityClass": 3,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 8,
          "assignmentName": "Test 1",
          "status": "marking",
          "priorityClass": 1,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 9,
          "assignmentName": "Lab 2",
          "status": "unmarked",
          "priorityClass": 5,
          "assessor": "Dr Klein"
        },
        {
          "assignmentID": 10,
          "assignmentName": "Lab 3",
          "status": "unmarked",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        },
        {
          "assignmentID": 11,
          "assignmentName": "Lab 3",
          "status": "unmarked",
          "priorityClass": 5,
          "assessor": "Dr Ranchod"
        }
      ]
      ;

    if(state == 1){
       var values = assignmentValues;
    }else{
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

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < values.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = values[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}