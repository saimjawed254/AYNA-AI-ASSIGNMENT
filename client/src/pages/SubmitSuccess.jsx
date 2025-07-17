export default function SubmitSuccess() {
  return (
    <div className="public-form">
        <div style={{
          textAlign:'center'
        }} className="public-form-container">
          <div className="public-form-header">Feedback form
            <span className="public-form-title"><br />Your Response has been saved in the database</span>
            <span className="public-form-title"><br />You can now close this window or go back</span>
          </div>
          <div style={{
            width:'97%',
            height:'20vh',
            background:'#fff',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontSize:'1.25vw',
            fontWeight:'600',
            borderRadius:'1vw'
          }} >
            Successfully Submitted
          </div>
        </div>
      </div>
  );
}
