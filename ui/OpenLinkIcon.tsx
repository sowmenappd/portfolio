export default function ({ className, onClick }: { className?: string; onClick?: (e: any) => void }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
      fill="#cccccc00" 
      onClick={onClick}
      >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>



    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={className}
    //   viewBox="0 0 24 24"
    //   fill="currentColor"
    // >
    //   <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    // </svg>
  )
}
