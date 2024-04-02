import { Input } from "@chakra-ui/react"

interface IInputFieldComponentprops {
  type: string, 
  name: string, 
  value: string, 
  onChange: (e: { target: { name: string; value: string } }) => void
}

const InputFieldNoSpaceComponent = (props: IInputFieldComponentprops) => {
  const { type, name, value, onChange } = props

  const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <Input 
    type={type} 
    name={name}
    value={value} 
    onChange={onChange} 
    onKeyDown={handleKeyDown}
    _focus={{ borderColor: "none" }} 
    _hover={{ borderColor: "none" }} 
    _active={{ borderColor: "none" }}
    sx={{ textDecoration: "none" }}    
    autoComplete='off' 
  />    
  )
}

export default InputFieldNoSpaceComponent