export default function H2({children, className=""}) {
    return <h2 className={"text-3xl font-semibold " + className}>
        {children}
    </h2>
}