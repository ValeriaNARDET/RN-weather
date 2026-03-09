import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

const keepAwake = () => {
    let isMounted = true;
    
    const enableKeepAwake = async () => {
        try {
            if (isMounted) {
                await activateKeepAwakeAsync();
            }
        } catch (error) {
            console.log("Activity not ready", error);
        }
    };
    
    enableKeepAwake();
    
    return () => {
        isMounted = false;
        deactivateKeepAwake();
    };
}

export default keepAwake;