let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};

/* ---------scroll section active link----------*/

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll =() => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

            });
        };
    });

    /*-----------sticky navbar------------*/

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

     /*---------remove toggle icon and navbar when click navbar link (scroll)----------*/

     menuIcon.classList.remove('bx-x');
     navbar.classList.remove('active');
}; 


/*------------------Contact Form ----------------*/

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");


function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value} <br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;




    Email.send({
        SecureToken: "68ed6a24-efce-4952-ac29-528a1563e9f3",
        Host: "smtp.elasticemail.com",
        Username: "anjalikeshri8102@gmail.com",
        Password: "597EDE7CCB37722B661A67CF18648CA53BC7",
        To: 'anjalikeshri8102@gmail.com',
        From: "anjalikeshri8102@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                });
            
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        })

        item.addEventListener("keyup", () => {
            if(item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");

            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error");

            }

        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");


    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerText = "Email Address can't be blank";

        }
    }

    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");

    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error") ) {
        sendEmail();

        form.reset();
        return false;
    }


});