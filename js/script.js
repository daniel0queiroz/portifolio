/*======== menu icon navbar =======*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*======== scroll sections active links =======*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*=== sticky navbar ==== */
  let header = document.querySelector(".header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*=== remove menu icon navbar when click navbar link (scroll) ==== */

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=== dark light mode ==== */

let darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  let name = document.getElementById("coName");
  let email = document.getElementById("coEmail");
  let cellphone = document.getElementById("coCellphone");
  let subject = document.getElementById("coSubject");
  let msg = document.querySelector(".coMsgInput");

  console.log(msg)

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let coName = name ? name.value : '';
    let coEmail = email ? email.value : '';
    let coCellphone = cellphone ? cellphone.value : '';
    let coSubject = subject ? subject.value : '';
    let coMsg = msg ? msg.value : '';

    console.log(coName)
    console.log(coEmail)
    console.log(coCellphone)
    console.log(coSubject)
    console.log(coMsg)

    var title =
      "Muito obrigado pela sua mensagem! Breve entrarei em contato para agendamento de reunião.";
    var emailContent = "<div><b>Nome:</b> " + coName + "</div>";
    emailContent = emailContent + "<div><b>Email:</b> " + coEmail + "</div>";
    emailContent =
      emailContent + "<div><b>Telefone:</b> " + coCellphone + "</div>";
    emailContent =
      emailContent + "<div><b>Assunto:</b> " + coSubject + "</div>";
    emailContent = emailContent + "<div><b>Msg:</b> " + coMsg + "</div>";

    const layoutEmail = callDefaultLayoutEmail(title, emailContent);

    var emailContentHtml = layoutEmail;

    var emailFields = {
      emailSubject: "Mensagem de Contato | Daniel Queiroz | Portfolio",
      emailTo: [
        coEmail,
        "vemcasamento@outlook.com",
        "daniel.olivqueiroz@outlook.com",
      ],
      emailContent: emailContentHtml,
    };

    fetch("http://localhost:4010/emails/send", {
      method: "POST",
      body: JSON.stringify(emailFields),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  function callDefaultLayoutEmail(mailTitle, mailContent) {
    const layoutEmailGlobalCss =
      "width:100%; background:#EBEBEB; color:#1F4F82; padding:10px;";
    const layoutEmailGlobalColorTd = "color:#1F4F82; text-align:center;";
    const layoutEmailContentCss =
      "width:600px; background:#fff; margin:15px auto;";
    const layoutEmailHeaderCss =
      "padding:10px; text-align:center; background: #fff;";
    const layoutEmailDynamicContentCss =
      "padding:10px; text-align:left !important; color: #1F4F82 !important;";
    const layoutEmailBlueEffectCss = "background: #0E7886; height:20px;";
    const layoutEmailFooterCss =
      "background: #393939; color:#fff; padding:10px; width:100%; text-align:left !important;";
    const layoutEmailTitleCss =
      "text-align:center !important; color: #1F4F82 !important;";

    var htmlEmail =
      "<table style='" +
      layoutEmailGlobalCss +
      "'><tr><td style='" +
      layoutEmailGlobalColorTd +
      "'>";
    htmlEmail += "<table style='" + layoutEmailContentCss + "'><tr>";
    htmlEmail += "<td style='" + layoutEmailHeaderCss + "'>";
    // htmlEmail += "<img height='80' src='https://api.vemcasamento.com/images/logo-vem-casamento.png' >";
    htmlEmail += "</td></tr><tr>";
    htmlEmail += "<td style='" + layoutEmailDynamicContentCss + "'  >";
    htmlEmail +=
      "<div style='" +
      layoutEmailTitleCss +
      "' ><h2>" +
      mailTitle +
      "</h2></div>";
    htmlEmail += mailContent;
    htmlEmail += "</td></tr><tr>";
    htmlEmail += "<td style='" + layoutEmailBlueEffectCss + "'></td>";
    htmlEmail += "</tr><tr>";
    htmlEmail += "<td style='" + layoutEmailFooterCss + "' >";

    return htmlEmail;
  }
});
