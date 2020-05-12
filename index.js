function loadInstruction() {
  var $ = go.GraphObject.make;
  myDiagram = $(go.Diagram, "myDiagramDiv", {
    // allow double-click in background to create a new node
    //"clickCreatingTool.archetypeNodeData": { text: "Node", color: "white" },

    // allow Ctrl-G to call groupSelection()
    //"commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },

    // enable undo & redo
    "undoManager.isEnabled": true
  });


  var registertemplate =
    // a spot is literally a spot on the shape
    $(go.Node, "Spot",
      $(go.Panel, "Spot",
        // register
        $(go.Shape, "RoundedRectangle", {
          fill: "lightblue",
          desiredSize: new go.Size(100, 150),
          //initialDocumentSpot: go.Spot.TopCenter
        }),
        $(go.TextBlock, { margin: 0, position: new go.Point(50, 75) },
          new go.Binding("text", "key")
        )
      ),
      // readreg1 left port
      $(go.Shape, "Ellipse",
        {
          fill: "pink",
          // puts readreg1 top left
          alignment: new go.Spot(0, 0, 0, 30),
          desiredSize: new go.Size(10, 10), //alignment: go.Spot.Left,
          portId: "readreg1", fromSpot: go.Spot.Right, toSpot: go.Spot.Left,
          fromLinkable: false, toLinkable: true
        },
      ),
      $(go.TextBlock, "RR1", { alignment: new go.Spot(0, 0, 5, 30), alignmentFocus: go.Spot.Left }),
      // readreg2 left port
      $(go.Shape, "Ellipse",
        {
          fill: "pink",
          // puts readreg2 top left
          alignment: new go.Spot(0, 0, 0, 60),
          desiredSize: new go.Size(10, 10), //alignment: go.Spot.Left,
          portId: "readreg2", fromSpot: go.Spot.Right, toSpot: go.Spot.Left,
          fromLinkable: false, toLinkable: true
        }
      ),
      $(go.TextBlock, "RR2", { alignment: new go.Spot(0, 0, 5, 60), alignmentFocus: go.Spot.Left }),
      // write register left port
      $(go.Shape, "Ellipse",
        {
          fill: "pink",
          // puts write register top left
          alignment: new go.Spot(0, 0, 0, 90),
          desiredSize: new go.Size(10, 10), //alignment: go.Spot.Left,
          portId: "writereg", fromSpot: go.Spot.Right, toSpot: go.Spot.Left,
          fromLinkable: false, toLinkable: true
        }
      ),
      $(go.TextBlock, "WR", { alignment: new go.Spot(0, 0, 5, 90), alignmentFocus: go.Spot.Left }),
      // write data left port
      $(go.Shape, "Ellipse",
        {
          fill: "pink",
          // puts write data top left
          alignment: new go.Spot(0, 0, 0, 120),
          desiredSize: new go.Size(10, 10), //alignment: go.Spot.Left,
          portId: "writedata", fromSpot: go.Spot.Right, toSpot: go.Spot.Left,
          fromLinkable: false, toLinkable: true
        }
      ),
      $(go.TextBlock, "WD", { alignment: new go.Spot(0, 0, 5, 120), alignmentFocus: go.Spot.Left }),
      // read data1 right port
      $(go.Shape, "Ellipse",
        {
          fill: "green",
          alignment: new go.Spot(1, 0, 0, 45),
          desiredSize: new go.Size(10, 10), //alignment: go.Spot.Right,
          portId: "readdata1", fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
          fromLinkable: true, toLinkable: false
        }
      ),
      // read data2 right port
      $(go.Shape, "Ellipse",
        {
          fill: "green",
          alignment: new go.Spot(1, 0, 0, 105),
          desiredSize: new go.Size(10, 10), //alignment: go.Spot.Right,
          portId: "readdata2", fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
          fromLinkable: true, toLinkable: false
        }
      ),
      // $(go.TextBlock, { font: "20px sans-serif" },
      //   new go.Binding("text", "key")
      // )
    );
    // $(go.Panel, "Spot",
    //   // register
    //   $(go.Shape, "TriangleRight", {
    //     fill: "lightred",
    //     desiredSize: new go.Size(100, 150),
    //     //initialDocumentSpot: go.Spot.TopCenter
    //   }),
    //   $(go.TextBlock, { margin: 0, position: new go.Point(50, 75) },
    //     new go.Binding("text", "key")
    //   )
    // ),
    var imtemplate = $(go.Node, "Position",
    $(go.Shape, "RoundedRectangle",
      new go.Binding("fill", "color")),
    $(go.TextBlock,
      { margin: 8 },
      { alignment: new go.Spot(0, 0) },
      new go.Binding("text", "key"))
  );

  var templmap = new go.Map(); // In TypeScript you could write: new go.Map<string, go.Node>();
  // for each of the node categories, specify which template to use
  templmap.add("register", registertemplate);
  templmap.add("im", imtemplate);
  myDiagram.nodeTemplateMap = templmap;

    myDiagram.model = new go.GraphLinksModel(
      [
        { key: "Register", category: "register" },
        { key: "Beta", category: "im"},
      ],
      [
        // this makes the line before the user can. Maybe we call this for the solver
        // { from: "Register", to: "Beta", fromPort: "r", toPort: "l" }
      ]
    );

  myDiagram.model.linkFromPortIdProperty = "fromPort";
  myDiagram.model.linkToPortIdProperty = "toPort";
  initialDocumentSpot: go.Spot.TopCenter; // may work, idk

  // enable Ctrl+Z to undo and Ctrl-Y to redo
}

function addInstruction() {
  var $ = go.GraphObject.make;
  myDiagram = $(go.Diagram, "myDiagramDiv")

  myDiagram.nodeTemplate =
    $(go.Node, "Position",
      $(go.Shape, "RoundedRectangle",
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 8 },
        { alignment: new go.Spot(0, 0) },
        new go.Binding("text", "key"))
    );

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "Alpha", color: "orange" },
      { key: "Beta", color: "lime" },
      { key: "Charlie", color: "brown" },
    ],
    [
      { to: "Charlie", from: "Alpha" }
    ]
  )


  // enable Ctrl+Z to undo and Ctrl-Y to redo
  myDiagram.undoManager.isEnabled = true;
}

function storeInstruction() {

}

function reloadThePage() {
  myDiagram.div = null;
}


/**
 * Notes: We can keep the model data separate the diagram's appearance.
 * The model data will be arrays of information that can be passed to each
 * diagram.
 */