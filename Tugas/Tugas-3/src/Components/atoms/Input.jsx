const Input = ({ id, name, type = "text", className = "", ...props }) => {
  return <input id={id} name={name ?? id} type={type} className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-100 ${className}`} {...props} />;
};

export default Input;
