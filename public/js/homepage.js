//  homepage.js

$(document).ready(function() {

    populateTable();
    $('#addPiano').on('click', addpiano);
    
    // delete piano
    
    $('#inventoryBody').on('click', 'td a.linkdeletepiano', deletePiano);
    
  $(function() {
    $( "#inputSoldon" ).datepicker();
  });

});




function populateTable() {
    
    console.log('populatetable function called');
    var t = '';
    
    $.getJSON('/inventory', function(data) {
        
        data.forEach(function (p) {
            t += '<tr><td>' +p.model+ '</td>';
            t += '<td>' +p.serial+ '</td>';
            t += '<td>' +p.location+ '</td>';
            t += '<td>' +p.showroom+ '</td>';
            t += '<td>' +p.sold+ '</td>';
            t += '<td>' +formatdate(p.dateOfSale)+ '</td>';
            t += '<td>' +p.appId+ '</td>';
            t += '<td>' +p.appactivated+ '</td>';
            t += '<td>' +p.custName+ '</td>';
            t += '<td>' +p.custAddress+ '</td>';
            t += '<td>' +p.custEmail+ '</td>';
            t += '<td>' +p.custPhone+ '</td>';
            t += '<td><a  href="#" class="linkdeletepiano" rel="' + p._id + '">delete</a></td></tr>';
        });
        
        $('#inventoryBody').html(t);
    });
}

function formatdate(d) {
    
    if (d == (undefined || null)){
        return '-';
           
    } else {
        var date = new Date(d);
        console.log('date: ', d);
    
return date.toLocaleDateString();
}
}
 

function addpiano(event) {
    
    console.log('addpiano called');
    event.preventDefault();
    
    var addpiano = {
        'model' : $('#inputModel').val(),
        'serial': $('#addeditpiano input#inputSerial').val(),
        'location': $('#addeditpiano input#inputLocation').val(),
        'showroom': $('#addeditpiano input#inputShowroom').val(),
        'sold': $('#inputSold').val(),
        'appactivated': $('#inputAppactivated').val(),
        'dateOfSale': $('#addeditpiano input#inputSoldon').val(),
        'appId': $('#addeditpiano input#inputAppid').val(),
        'custName': $('#addeditpiano input#inputCustomer').val(),
        'custAddress': $('#addeditpiano input#inputcustAddress').val(),
        'custEmail': $('#addeditpiano input#inputcustEmail').val(),
        'custPhone': $('#addeditpiano input#inputcustPhone').val()
    };
        
    $.ajax({
        type: 'POST',
        data: addpiano,
        url : '/addpiano',
        dataType: 'JSON'
    }).done(function(data) {
        
        console.log('data from save new piano: ', data);
        if (data == 1) {
            populateTable();
        } else {
            alert('Error: ' +data.message);
        }
    });
}
        
// delete piano

function deletePiano(event) {

    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this piano?');
    
    if (confirmation === true) {

        $.ajax({
            type: 'DELETE',
            url: '/delete_piano/' + $(this).attr('rel'),
	    dataType: 'json'
        }).done(function( data ) {
            
            console.log('data after delete: ', data);

            // Check for a successful (1) response
            if (data == 1) {
                $('#inventoryBody').show();
	      populateTable();
	      
	    } else {
                alert('Error: ' + response.msg);
            }

        });

    }
    else {

        // If user says no, do nothing
        return false;

    }    
};
        
        
    
    
    