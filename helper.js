try {

    const typography = new Typography({
        baseFontSize: '18px',
        baseLineHeight: 1.666,
        headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        bodyFontFamily: ['Georgia', 'serif'],
      })
    typography.injectStyles()

    const Title = styled.h1 `
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
    `;
    const titleWithContent = React.createElement(Title, { key: "title-with-content" }, "React and Styled Components works fine!")

    const Wrapper = styled.section `
        padding: 4em;
        background: papayawhip;
    `;

    const img = React.createElement('img', {
        src: 'https://travis-ci.org/Zombispormedio/codepen-event-bundle.svg?branch=master', 
        key: 'travis-state-img'
    })

    const main = React.createElement(Wrapper, null, [titleWithContent, img]);
    ReactDOM.render(
        main,
        document.getElementById('root')
    );
} catch (e) {
    document.writeln(e);
}
