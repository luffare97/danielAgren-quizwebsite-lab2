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

var points;

/* Checks the answers if they are ok of not */
function CheckAnswers() {
    var ok = true;
    points = 0;
    

    /* Personal info questions */
    var fname = TextGetter('fname');
    var lname = TextGetter('lname');
    var email = TextGetter('email');
        /* First Name */
    if (fname.length == 0 || /^[A-Za-z]+$/.test(fname) == false) {        
        ok = false;
        document.getElementById('askFName').style.color = 'brown';
    }
    else {
        document.getElementById('askFName').style.color = 'black';
    }
        /* Last Name */
    if (lname.length == 0 || /^[A-Za-z]+$/.test(lname) == false) {
        ok = false;
        document.getElementById('askLName').style.color = 'brown';
    }
    else {
        document.getElementById('askLName').style.color = 'black';
    }
        /* Email */
    if (email.length == 0) {
        ok = false;
        document.getElementById('askEmail').style.color = 'brown';
    }
    else {
        document.getElementById('askEmail').style.color = 'black';
    }
    
        /* Pokémon questions */
    var mandatory = true;

    var favMon = TextGetter('favMon');
    if (favMon.length == 0) {
        ok = false;
        document.getElementById('askFmon').style.color = 'brown';
    }
    else {
        document.getElementById('askFmon').style.color = 'black';
    }
   
    mandatory = false;
    radioChecker('darkMon', mandatory);
    mandatory = false;
    radioChecker('bugMon', mandatory);   
    mandatory = true;
    radioChecker('fairyMon', mandatory);
    mandatory = true;
    radioChecker('steelMon', mandatory);


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
        var result = 'You got ' + points + ' right out of 5';
        document.getElementById('answerBox').style.visibility = "visible"; 
        document.getElementById('nameField').innerHTML = fname + " " + lname;
        document.getElementById('emailField').innerHTML = email;
        document.getElementById('knowledgeAnswer').innerHTML = document.getElementById('knowledge').value + "/5";
        document.getElementById('FaveMon').innerHTML = favMon;
        document.getElementById('thoughtsAnswer').innerHTML = document.getElementById('bigQuestion').value;
        document.getElementById('score').innerHTML = result;
        document.getElementById('alertText').innerHTML = "Your answers have been submitted!";
        document.getElementById('alertText').style.color = "green";
    } 
    else if (ok == false) {
        document.getElementById('alertText').innerHTML = "Make sure all mandatory questions where answered and formated corectly";
        document.getElementById('alertText').style.color = "red";
    }
    
};

function TextGetter (id){
    return document.getElementById(id).value;
};

function radioChecker (typeMon, mandatory) {
    var radios = document.getElementsByName(typeMon);
    var answered = false;
    let radioAnswer = typeMon + "Answer";
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
   
            if(radios[i].value == "right") {
                document.getElementById(radioAnswer).style.color = 'green';
                points++;
            }
            else {
                document.getElementById(radioAnswer).style.color = 'brown';
            }

            
            answered = true;

        }   
    }

    if (answered == false) {
        
        
        if(mandatory == true) {
            document.getElementById(typeMon).style.color = 'brown';
            ok = false;
        }
        
    }
    else {
        document.getElementById(typeMon).style.color = 'black';
        
    }
};

function CheckboxChecker () {
    let checkBoxes = document.querySelectorAll('input[name="type"]:checked');
    let values = [];
    checkBoxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });

    if(values.toString() == "right,right"){
        document.getElementById('kokoAnswer').style.color = 'green';
        points++;
    }
    else {
        document.getElementById('kokoAnswer').style.color = 'brown';
    }
    
};
