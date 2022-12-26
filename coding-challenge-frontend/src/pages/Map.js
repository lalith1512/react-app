function Map(params){
    console.log(params);
    return(
        <>
    <iframe id="iframeId" src={`https://maps.google.com/maps?q=${params.lt},${params.ln}&hl=es;&output=embed`} height="400px" width="400px"></iframe>
    </>
    );
}//https://maps.google.com/maps?q=11.4216,40.7630&hl=es;&output=embed
export default Map;