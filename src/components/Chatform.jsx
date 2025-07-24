import { useRef, useEffect } from "react";

const Chatform = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  selectedProduct,
  setSelectedProduct,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    console.log("Chatbot hosted at:", window.location.href);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage || !selectedProduct) return;

    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]),
      600
    );

    generateBotResponse(
      [...chatHistory, { role: "user", text: userMessage }],
      selectedProduct
    );
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      {/* <Select onChange={(e) => setSelectedProduct(e.target.value)}></Select> */}
      <select
        name="products"
        id="products"
        className="custom-select"
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="" disabled selected>
          Choose a product
        </option>
        <option value="dai">Driverless AI</option>
        <option value="h2o3">H2O3</option>
        <option value="wave">Wave</option>
        <option value="h2ogpte">H2ogpte</option>
        <option value="eScorer">H2O eScorer</option>
        <option value="water">Sparkling Water</option>
        <option value="health">H2O Health</option>
        <option value="puddle">H2O Puddle</option>
        <option value="eSteam">Enterprise Stream</option>
      </select>

      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default Chatform;
