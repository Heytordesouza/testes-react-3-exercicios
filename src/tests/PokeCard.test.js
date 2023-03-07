import { pokeCardMock } from "./pokeCardMock"
import Pokecard from "../components/Pokecard"
import axios from "axios"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("axios")

//Props mockados
const urlMock = "https://pokeapi.co/api/v2/pokemon/2/"

const openModalMock = jest.fn()

//Resposta do axios.get Mockado
const axiosResponseMock = {
    data: pokeCardMock
}

describe("PokeCard", () => {

    test("Renderizar Card", async() => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<Pokecard url={urlMock} openModal={openModalMock}/>)
        // screen.debug()

        await waitFor(() => {})
        // screen.debug()
    })

    test("Card renderiza após carregamento", async () => {

        axios.get.mockResolvedValueOnce({
            data: pokeCardMock
        })

        render(<Pokecard url={urlMock} openModal={openModalMock}/>)

        // screen.logTestingPlaygroundURL()

        const loading = screen.getByText(/loading\.\.\./i)

        expect(loading).toBeInTheDocument()

        await waitFor(() => {
           
            const namePoke = screen.getByRole('heading', {name: /bulbasaur/i})
            const imgPoke = screen.getByRole('img', {name: /bulbasaur/i})
            const typePoke = screen.getByText(/grass/i)

            expect(namePoke).toBeInTheDocument()
            expect(imgPoke).toBeInTheDocument()
            expect(typePoke).toBeInTheDocument()
            screen.debug()
        })
        
    })

    test("testar abertura do modal", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        const user = userEvent.setup()

        render(<Pokecard url={urlMock} openModal={openModalMock}/>)

        await waitFor(() => {})

        await user.click(screen.getByRole("article"))

        expect(openModalMock).toBeCalledTimes(1)
    })
})

