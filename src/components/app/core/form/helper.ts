const formatLabel = ({ label, isRequired = false }: { label: string, isRequired?: boolean }) => {
  return label + (isRequired ? ' *' : '')
}

export { formatLabel }
