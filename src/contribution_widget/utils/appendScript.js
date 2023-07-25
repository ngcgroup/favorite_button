export const appendScript = (id, scriptToAppend,) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.id = id;
    script.async = true;
    document.body.appendChild(script);
};