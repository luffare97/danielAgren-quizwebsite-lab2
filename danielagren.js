/* Removing the relode on submit and cehcking if answers are ok */
var form = document.getElementById('submitForm');
form.addEventListener("submit", function(){
    event.preventDefault();
    CheckAnswers();
    
});

/* For limiting to max 2 checkboxes being checked */ 
var checkBoxes = document.getElementsByName('type');
checkBoxes.forEach(function(checkbox){
    checkbox.addEventListener('change', function(){
        var checkedCount = document.querySelectorAll('input[name="type"]:checked').length;
        if (checkedCount > 2){
            this.checked=false;
        }
        if (checkedCount == 2){
            checkBoxes.forEach(function(otherCheckbox){
                if(!otherCheckbox.checked){
                    otherCheckbox.disabled = true;
                }
            });
            
        }
        else {
            checkBoxes.forEach(function(otherCheckbox){
                if(!otherCheckbox.checked){
                    otherCheckbox.disabled = false;
                }
            });
        }
    });
});

/* Checks the answers if they are ok of not */
function CheckAnswers() {
    var ok = true;

    /* Personal info questions */
    var fname = TextGetter('fname');
    var lname = TextGetter('lname');
    var email = TextGetter('email');
        /* First Name */
    if (fname.length == 0 || /[0-9]/.test(fname) == true) {        
        ok = false;
        document.getElementById('askFName').style.color = 'brown';
    }
    else {
        document.getElementById('askFName').style.color = 'black';
    }
        /* Last Name */
    if (lname.length == 0 || /[0-9]/.test(lname) == true) {
        ok = false;
        document.getElementById('askLName').style.color = 'brown';
    }
    else {
        document.getElementById('askLName').style.color = 'black';
    }
    
        /* Pokémon questions */
    var favMon = TextGetter('favMon');
    if (favMon.length == 0) {
        ok = false;
        document.getElementById('askFmon').style.color = 'brown';
    }
    else {
        document.getElementById('askFmon').style.color = 'black';
    }

    var radios = document.getElementsByName('darkMon');
    var answered = false;
    var radioAnswer;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
   
            if(radios[i].value == "Guzzlord") {
                document.getElementById('typeQAnswer').style.color = 'green';
            }
            else {
                document.getElementById('typeQAnswer').style.color = 'brown';
            }

            document.getElementById('typeQAnswer').innerHTML = radios[i].value;
            answered = true;

        }   
    }

    if (answered == false) {
        ok = false;
        document.getElementById('darkMon').style.color = 'brown';
    }
    else {
        document.getElementById('darkMon').style.color = 'black';
    }



    if(document.querySelectorAll('input[name="type"]:checked').length == 0) {
        document.getElementById('typing').style.color = 'brown';
        ok = false;
    }
    else {
        document.getElementById('typing').style.color = 'black';
        CheckboxChecker();
    }
    

    /* If everything is ok make it visible */
    if (ok == true) {
        document.getElementById('answerBox').style.visibility = "visible"; 
        document.getElementById('nameField').innerHTML = fname + " " + lname;
        document.getElementById('emailField').innerHTML = email;
        document.getElementById('knowledgeAnswer').innerHTML = document.getElementById('knowledge').value + "/5";
        document.getElementById('FaveMon').innerHTML = favMon;
        document.getElementById('thoughtsAnswer').innerHTML = document.getElementById('bigQuestion').value;
              
    } 
    else if (ok == false) {
        alert('the form is not correctly filled out, Please answer all the red questions');
    }
    
};

function TextGetter (id){
    return document.getElementById(id).value;
}

function CheckboxChecker () {
    let checkBoxes = document.querySelectorAll('input[name="type"]:checked');
    let values = [];
    checkBoxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });

    document.getElementById('kokoAnswer').innerHTML = values;
    if(values.toString() == "Electric,Fairy"){
        document.getElementById('kokoAnswer').style.color = 'green';
    }
    else {
        document.getElementById('kokoAnswer').style.color = 'brown';
    }
    
}
