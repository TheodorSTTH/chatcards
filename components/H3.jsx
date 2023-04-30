export default function H3({children, className=""}) {
    return <h3 className={"text-2xl font-medium " + className}>
        {children}
    </h3>
}