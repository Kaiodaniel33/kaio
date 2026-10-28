document.addEventListener("DOMContentLoaded", () => {
    // Menu responsivo
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });
    }

    // Carregar uma imagem aleatória de cachorro
    const dogImage = document.querySelector(".img-dog");
    const newDogButton = document.querySelector("#new-dog");

    if (dogImage && newDogButton) {
        const originalButtonText = newDogButton.textContent;

        newDogButton.addEventListener("click", async () => {
            newDogButton.disabled = true;
            newDogButton.textContent = "Carregando...";

            try {
                const response = await fetch(
                    "https://dog.ceo/api/breeds/image/random"
                );

                if (!response.ok) {
                    throw new Error("A API respondeu com um erro.");
                }

                const data = await response.json();

                if (data.status !== "success" || !data.message) {
                    throw new Error("A API não retornou uma imagem válida.");
                }

                dogImage.src = data.message;
                dogImage.alt = "Foto aleatória de um cachorro";

            } catch (error) {
                console.error("Não foi possível carregar outra imagem:", error);
                newDogButton.textContent = "Tentar novamente";
                return;

            } finally {
                newDogButton.disabled = false;

                if (newDogButton.textContent === "Carregando...") {
                    newDogButton.textContent = originalButtonText;
                }
            }
        });
    }

    // Resumo da seleção na página de compra
    const itemName = document.querySelector("#item-name");
    const itemPrice = document.querySelector("#item-price");
    const confirmButton = document.querySelector("#confirm-purchase");
    const purchaseMessage = document.querySelector("#purchase-message");

    if (itemName && itemPrice) {
        const params = new URLSearchParams(window.location.search);
        const item = params.get("item");
        const price = Number(params.get("preco"));

        if (item && Number.isFinite(price) && price > 0) {
            itemName.textContent = item;

            itemPrice.textContent = price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        } else {
            itemName.textContent = "Nenhum item selecionado";
            itemPrice.textContent = "—";

            if (confirmButton) {
                confirmButton.disabled = true;
            }
        }
    }

    // Confirmação simulada
    if (confirmButton && purchaseMessage) {
        confirmButton.addEventListener("click", () => {
            purchaseMessage.textContent =
                "Seleção confirmada para demonstração! Nenhuma cobrança foi realizada.";

            confirmButton.textContent = "Demonstração confirmada ✓";
            confirmButton.disabled = true;
        });
    }

    // Formulário demonstrativo
    const contactForm = document.querySelector("#contact-form");
    const contactMessage = document.querySelector("#contact-message");

    if (contactForm && contactMessage) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            contactMessage.textContent =
                "Formulário validado! Para enviar mensagens de verdade, conecte-o a um serviço ou backend.";

            contactForm.reset();
        });
    }
});
