
import { Button } from "react-bootstrap";
import "../index.css"
import { useEffect, useReducer } from 'react';

type CounterState = {
    pageNumber: number
}

type CounterAction = {
    type: string
    payload: number
}

type NavProps = {
    pageNumber: number
    pageNumberUpdater: React.Dispatch<React.SetStateAction<number>>
    totalPages: number
}

const Nav = (props: NavProps) => {
    const initialState = { pageNumber: props.pageNumber }
    function reducer(state: CounterState, action: CounterAction) {
        switch (action.type) {
            case "increment":
                return { pageNumber: state.pageNumber + action.payload }
            case "decrement":
                return { pageNumber: state.pageNumber - action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        props.pageNumberUpdater(state.pageNumber)
    }, [props, state])
    return (
        <div className="button">
            {state.pageNumber > 1 && <Button variant="success"
                onClick={() => dispatch({ type: "decrement", payload: 1 })}>{"<<  Page"}</Button>
            } {state.pageNumber ? <h4 className="result-summary"> Page : {state.pageNumber}</h4> : ""
            }
            {state.pageNumber < props.totalPages && <Button variant="success"
                onClick={() => dispatch({ type: "increment", payload: 1 })}>{"Page  >>"}</Button>
            }
        </div>
    )
}

export default Nav