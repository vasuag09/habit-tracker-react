import logoImg from "../assets/logo.png"
export default function Header(){
    return (
        <header>
            <img src={logoImg} alt="" />
            <p>
                Track. Improve. Transform.
            </p>
        </header>
    )
}