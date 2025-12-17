import ScaleLoader from '../../assets/spinner.gif'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <img src={ScaleLoader} alt="Loading..." />
    </div>
  )
}

export default LoadingSpinner