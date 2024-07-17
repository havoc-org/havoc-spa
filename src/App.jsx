import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button className="yes-button">Super</button>
      <button className="no-button">Super</button>
      <button className="a-button">Super</button>
      <button className="b-button">Super</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>{' '}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
        suscipit libero, vitae facilisis libero. Maecenas sit amet ligula
        auctor, condimentum lectus ac, aliquet lacus. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce
        commodo nisl non dolor viverra imperdiet. Duis id pharetra lorem. Etiam
        dictum tellus ex, vel iaculis libero faucibus ornare. Phasellus feugiat
        lectus vel velit fermentum congue. Pellentesque rutrum diam at feugiat
        eleifend. In vestibulum id lectus eget ullamcorper. Proin convallis
        sapien eget cursus semper. Donec consequat in lectus et dapibus.
        Curabitur venenatis mi in leo sollicitudin bibendum. Fusce finibus arcu
        sed erat consectetur, ac blandit risus pharetra. Vestibulum auctor
        iaculis enim id fringilla. Donec id velit ut nibh vehicula ultrices.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Morbi eu nunc eget ipsum aliquam facilisis. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Praesent a ipsum at nisi consequat accumsan eleifend
        sed velit. Nam id pulvinar tellus. Fusce lorem nibh, feugiat in sodales
        sit amet, lobortis eu libero. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        In viverra id ex sed ultrices. Ut gravida, velit finibus consectetur
        ullamcorper, metus quam ullamcorper nulla, commodo aliquam ipsum libero
        vel enim. Phasellus nec venenatis eros. Duis convallis, mauris et ornare
        interdum, est felis blandit felis, fringilla commodo purus tortor quis
        ex. In eu interdum ante. Nulla commodo in massa vel consequat. Cras sed
        tincidunt purus, quis venenatis risus. Ut pulvinar tempor massa, quis
        aliquet odio faucibus ac. Nunc et tincidunt nisl. Cras tortor turpis,
        porttitor vitae elementum eu, sollicitudin nec dolor. Pellentesque et
        lectus nisl. Fusce a cursus velit, vel interdum metus. Vestibulum rutrum
        dui lacus, congue euismod arcu dignissim et. Vestibulum tellus augue,
        rhoncus in sodales sed, posuere in magna. Nulla ullamcorper at erat in
        auctor. Etiam at sem quis justo ultricies tempor. Maecenas pretium,
        justo id egestas tempus, erat purus tincidunt dui, id convallis nunc
        augue dignissim nisl. Pellentesque eu leo vitae arcu blandit
        pellentesque. Nam id iaculis est, id convallis justo. Donec sed mollis
        nisl, id accumsan ex. Vivamus vehicula dictum convallis. Pellentesque
        mattis porttitor dolor, vel finibus tortor dapibus sit amet. Vivamus
        sodales auctor pretium. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam feugiat efficitur arcu, id ullamcorper urna
        mattis vitae. Donec vestibulum luctus orci in mollis. Donec maximus
        libero id libero fringilla vehicula. Praesent congue arcu nec laoreet
        dignissim. Integer rutrum ex hendrerit, ultrices tortor vel, pulvinar
        mi. Praesent ornare in risus vel blandit. Curabitur laoreet ac lacus
        vitae varius.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
        suscipit libero, vitae facilisis libero. Maecenas sit amet ligula
        auctor, condimentum lectus ac, aliquet lacus. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce
        commodo nisl non dolor viverra imperdiet. Duis id pharetra lorem. Etiam
        dictum tellus ex, vel iaculis libero faucibus ornare. Phasellus feugiat
        lectus vel velit fermentum congue. Pellentesque rutrum diam at feugiat
        eleifend. In vestibulum id lectus eget ullamcorper. Proin convallis
        sapien eget cursus semper. Donec consequat in lectus et dapibus.
        Curabitur venenatis mi in leo sollicitudin bibendum. Fusce finibus arcu
        sed erat consectetur, ac blandit risus pharetra. Vestibulum auctor
        iaculis enim id fringilla. Donec id velit ut nibh vehicula ultrices.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Morbi eu nunc eget ipsum aliquam facilisis. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Praesent a ipsum at nisi consequat accumsan eleifend
        sed velit. Nam id pulvinar tellus. Fusce lorem nibh, feugiat in sodales
        sit amet, lobortis eu libero. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        In viverra id ex sed ultrices. Ut gravida, velit finibus consectetur
        ullamcorper, metus quam ullamcorper nulla, commodo aliquam ipsum libero
        vel enim. Phasellus nec venenatis eros. Duis convallis, mauris et ornare
        interdum, est felis blandit felis, fringilla commodo purus tortor quis
        ex. In eu interdum ante. Nulla commodo in massa vel consequat. Cras sed
        tincidunt purus, quis venenatis risus. Ut pulvinar tempor massa, quis
        aliquet odio faucibus ac. Nunc et tincidunt nisl. Cras tortor turpis,
        porttitor vitae elementum eu, sollicitudin nec dolor. Pellentesque et
        lectus nisl. Fusce a cursus velit, vel interdum metus. Vestibulum rutrum
        dui lacus, congue euismod arcu dignissim et. Vestibulum tellus augue,
        rhoncus in sodales sed, posuere in magna. Nulla ullamcorper at erat in
        auctor. Etiam at sem quis justo ultricies tempor. Maecenas pretium,
        justo id egestas tempus, erat purus tincidunt dui, id convallis nunc
        augue dignissim nisl. Pellentesque eu leo vitae arcu blandit
        pellentesque. Nam id iaculis est, id convallis justo. Donec sed mollis
        nisl, id accumsan ex. Vivamus vehicula dictum convallis. Pellentesque
        mattis porttitor dolor, vel finibus tortor dapibus sit amet. Vivamus
        sodales auctor pretium. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam feugiat efficitur arcu, id ullamcorper urna
        mattis vitae. Donec vestibulum luctus orci in mollis. Donec maximus
        libero id libero fringilla vehicula. Praesent congue arcu nec laoreet
        dignissim. Integer rutrum ex hendrerit, ultrices tortor vel, pulvinar
        mi. Praesent ornare in risus vel blandit. Curabitur laoreet ac lacus
        vitae varius.
      </p>
    </>
  );
}

export default App;
