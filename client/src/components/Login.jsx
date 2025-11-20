import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

import { useSession } from '../contexts/SessionContext'

const defaultUser = {
	email: 'jason@fl1.digital',
	password: 'Letmein123!',
}

const Login = () => {
	const [email, setEmail] = useState(defaultUser.email)
	const [password, setPassword] = useState(defaultUser.password)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const { setUser } = useSession()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await api.post('/api/users/login', { email: email, password: password })

			if (response.status === 200) {
				const data = response.data
				// Update the user in the context
				setUser({
					username: data.user.username,
					id: data.user.id,
				})

				localStorage.setItem('authToken', data.token)
				navigate('/')
				return
			}
		} catch (error) {
			console.error('Login failed', error)
			setError(error.response.data.message)
		} finally {
			setTimeout(() => {
				setError(null)
			}, 5000)
		}
	}

	const errorStyle = {
		backgroundColor: '#ffebee',
		color: '#c62828',
		border: '1px solid #ef9a9a',
		padding: '10px',
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			{error && <p style={errorStyle}>{error}</p>}
			<input
				type='text'
				placeholder='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type='submit'>Login</button>
		</form>
	)
}

export default Login
