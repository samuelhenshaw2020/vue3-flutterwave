

const useScriptLoader = (): Promise<boolean> => {

    // console.log("script de run")

    return new Promise((resolve, reject) => {

        const src = "https://checkout.flutterwave.com/v3.js";

        const script = document.createElement('script')

        script.src = src;
        script.async = true;
    
        document.getElementsByTagName("head")[0].appendChild(script)

        const onLoad = () => {
            resolve(true);
            script.removeEventListener('error', onError);
            script.removeEventListener('load', onLoad);
        }
        script.addEventListener('load',  onLoad);

        const onError = (err: any) => {
            reject(err);
            script.removeEventListener('error', onError);
            script.removeEventListener('load', onLoad);
        }
        script.addEventListener('error', onError)
    })
}


export default useScriptLoader;