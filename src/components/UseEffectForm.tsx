import {useEffect, useState} from 'react'
import { UserInterface } from '../types/User.interface.ts'
import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/users'
const fetchData = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const response = await axios.get(API_URL)

        return response.data
    } catch (error) {
        throw new Error('Failed')
    }
}

    const UseEffect = () => {

        const [users, setUsers] = useState<UserInterface[]>([])
        const [error, setError] = useState<string | null>(null)
        const [isLoading, setIsLoading] = useState<boolean>(true)

        useEffect(() => {
            const fetchDataAndHandleLoading = async () => {
                try {
                    const data = await fetchData()
                    setUsers(data)
                } catch (error) {
                    setError((error as Error).message)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchDataAndHandleLoading()

            return () => {

            }
        }, [])


    return (
        <div className="col-10 mx-auto">
            <h4>Render of users</h4>
            {isLoading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            <ul>
                {users.map((user: UserInterface) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default UseEffect