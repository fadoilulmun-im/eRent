export default (props) => {
    return (<div className={" transition-all flex self-stretch flex-col space-y-4 items-start justify-start px-6 py-2 "}>
        <div className="flex self-stretch space-x-4 items-center justify-between">
            <div className="text-base font-semibold leading-relaxed text-coolGray-900">
                {props.header}
            </div>

            {props.onEdit?<a onClick={() => { props.onEdit() }} className="text-xs font-bold leading-tight text-right text-coolGray-300">
                Change Method
            </a>:""}

        </div>
        <div onClick={() => { props.onClick() }} className="flex self-stretch space-x-3 items-center justify-start">
            <div className="flex flex-col items-center justify-center px-1 py-0.5">
                {props.icon}
            </div>
            <div className="text-sm leading-snug text-coolGray-900">
                {props.title}
            </div>
        </div>
    </div>)
}