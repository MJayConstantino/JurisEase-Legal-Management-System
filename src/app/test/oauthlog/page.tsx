// import { signup } from './actions'

export default function AdvLoginPage() {
  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="role">role: admin or user</label>
        <input id="role" name="role" type="text" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        {/* <button formAction={signup}>Sign up</button> */}
      </form>
    </>
  )
}
