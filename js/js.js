// Vars
const navShell = document.getElementById("navShell");
const menuBtn = document.getElementById("menuBtn");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const skillBars = document.querySelectorAll(".bar span");
const typedText = "I love building websites ";
const typedEl = document.getElementById("typed-text");
const aboutSection = document.getElementById("about");



document.body.classList.add("loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");

  setTimeout(() => {
    if (loader) {
      loader.classList.add("hide");
    }

    document.body.classList.remove("loading");

    setTimeout(() => {
      if (loader) loader.remove();
    }, 700);
  }, 1800);
});



if (menuBtn && navShell) {
  menuBtn.addEventListener("click", () => {
    navShell.classList.toggle("open");
    menuBtn.textContent = navShell.classList.contains("open") ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a, .nav-cta").forEach((link) => {
    link.addEventListener("click", () => {
      navShell.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navShell.classList.add("scrolled");
    } else {
      navShell.classList.remove("scrolled");
    }
  });
}


if (reveals.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((el) => revealObserver.observe(el));
}


if (counters.length) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.count) || 0;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 45));

        const timer = setInterval(() => {
          count += step;

          if (count >= target) {
            el.textContent = target === 100 ? `${target}%` : `${target}+`;
            clearInterval(timer);
          } else {
            el.textContent = count;
          }
        }, 28);

        observer.unobserve(el);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => countObserver.observe(counter));
}


if (skillBars.length) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
}

function showToast(message = "Message sent successfully — demo only ✨") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.right = "20px";
  toast.style.bottom = "20px";
  toast.style.padding = "16px 20px";
  toast.style.background = "linear-gradient(135deg, #e8333c, #ff6b72)";
  toast.style.color = "#fff";
  toast.style.borderRadius = "16px";
  toast.style.boxShadow = "0 16px 40px rgba(0,0,0,.28)";
  toast.style.zIndex = "9999";
  toast.style.fontWeight = "700";
  toast.style.opacity = "0";
  toast.style.transform = "translateY(20px)";
  toast.style.transition = ".35s ease";

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 350);
  }, 2400);
}



if (typedEl && aboutSection) {
  let index = 0;
  let startedTyping = false;
  const typingSpeed = 50;

  function typeEffect() {
    if (index < typedText.length) {
      typedEl.textContent += typedText.charAt(index);
      index++;
      setTimeout(typeEffect, typingSpeed);
    } else {
      typedEl.classList.add("done");
    }
  }

  const typingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !startedTyping) {
          startedTyping = true;

          setTimeout(() => {
            typeEffect();
          }, 250);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  typingObserver.observe(aboutSection);
}



emailjs.init({
  publicKey: 'zzNwLqn3Sfd_4diRd',
});



 const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_d87gvpn', 'template_230ef6i', e.target)
    .then((result) => {
        console.log('SUCCESS!', result.text);
    }, (error) => {
        console.log('FAILED...', error.text);
    });
};
