
type RecommenderProps = {
    handleSelection : (recommendation: string) => void
}
function Recommender({handleSelection}: RecommenderProps) {
  return (
    <div  className="recommendation">
    <div onClick={() => handleSelection("europe")}>europe</div>
    <div onClick={() => handleSelection("apartment")}>apartment</div>
    <div onClick={() => handleSelection("computer")}>computer</div>
    <div onClick={() => handleSelection("design")}>design</div>
    <div onClick={() => handleSelection("bodyart")}>bodyart</div>
    <div onClick={() => handleSelection("people")}>people</div>
  </div>  )
}

export default Recommender