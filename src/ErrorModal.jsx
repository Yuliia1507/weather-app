import { useEffect, useRef, useState } from "react";
import "./ErrorModal.scss";

function ErrorModal({ message, onClose, returnFocusRef }) {
	const modalRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false); // для анімації

	useEffect(() => {
		if (!message) return;

		// Показуємо модалку з анімацією
		const timeoutId = setTimeout(() => setIsVisible(true), 10);

		// Зберігаємо скрол і блокуємо його
		const scrollY = window.scrollY;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.left = "0";
		document.body.style.right = "0";
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		// Фокус на першому елементі всередині модалки
		const focusableEls = modalRef.current.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstEl = focusableEls[0];
		const lastEl = focusableEls[focusableEls.length - 1];
		firstEl?.focus();

		// Клавіатурна навігація
		const handleKeyDown = (e) => {
			if (e.key === "Escape") handleClose();
			if (e.key === "Tab") {
				if (e.shiftKey && document.activeElement === firstEl) {
					e.preventDefault();
					lastEl.focus();
				} else if (!e.shiftKey && document.activeElement === lastEl) {
					e.preventDefault();
					firstEl.focus();
				}
			}
		};
		document.addEventListener("keydown", handleKeyDown);

		// Закриття модалки
		const handleClose = () => {
			setIsVisible(false);
			setTimeout(() => {
				onClose();
				// Повертаємо скрол
				document.body.style.position = "";
				document.body.style.top = "";
				document.body.style.left = "";
				document.body.style.right = "";
				document.body.style.paddingRight = "";
				window.scrollTo(0, scrollY);

				// Повертаємо фокус
				returnFocusRef?.current?.focus();
			}, 300); // час анімації
		};

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("keydown", handleKeyDown);
			// якщо модалка закривається примусово
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.left = "";
			document.body.style.right = "";
			document.body.style.paddingRight = "";
			window.scrollTo(0, scrollY);
		};
	}, [message, onClose, returnFocusRef]);

	if (!message) return null;

	const handleOverlayClick = () => {
		setIsVisible(false);
		setTimeout(onClose, 300);
	};

	return (
		<div
			className={`modal-overlay ${isVisible ? "visible" : ""}`}
			onClick={handleOverlayClick}
		>
			<div
				className={`modal-content ${isVisible ? "visible" : ""}`}
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}
				tabIndex={-1}
			>
				<p className="modal-message">{message}</p>
				<button
					className="modal-close"
					onClick={handleOverlayClick}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default ErrorModal;
