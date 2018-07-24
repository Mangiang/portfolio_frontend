export const styles = {
    link: {
        width: 200,
        height: 200,
        display: "inline-block",
        backgroundColor: "#1100db",
        color: "white",
        verticalAlign: "top",
        ":hover": {
            transitionDuration: '.7s',
        },
        overflow: 'hidden'
    },
    projectName: {
        backgroundColor: "#9370DB",
        opacity: 0,
        position: 'absolute',
        top: 0,
        width: 200,
        height: 200,
        zIndex: 2,
        padding: 10,
        ":hover": {
            transitionDuration: '.5s',
            opacity: 0.8
        }
    }
};
