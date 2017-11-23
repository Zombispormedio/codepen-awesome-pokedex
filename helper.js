try {
    const Title = styled.default.h1 `
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
    `;
    const titleWithContent = React.createElement(Title, null, "React and Styled Components works fine!")

    const Wrapper = styled.default.section `
        padding: 4em;
        background: papayawhip;
    `;

    const main = React.createElement(Wrapper, null, titleWithContent);
    ReactDOM.render(
        main,
        document.getElementById('root')
    );
} catch (e) {
    document.writeln(e);
}
