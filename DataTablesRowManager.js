/*
 * Automatically manages rows for a enabled jquery DataTables table.
 * https://github.com/dmcelectrico/DataTablesRowManager
 * 
 * USAGE:
 *  1) Instantiate DataTablesRowManager for each table to manage.
 *  2) Initialize object with the following parameters:
 *    - dataTable: DataTables enabled table.
 *    - fixedHeight: Not available space in the page for row allocation. Algorithm will fill the remaining space in the viewport with rows.
 *    - rowHeight: Height of each table row.
 *    - minRows: Minimum amount of rows to draw.
 *    
 *  3) Invocate autoHeightResize everytime viewport size changes (i.e. with $(window).resize() event) and after the page is fully loaded..
 *  
 */
function DataTablesRowManager() {
	return {
		dataTable : null,
		minRows : 0,
		rowHeight : 0,
		fixedheight : 0,

		/*
		 * Initializes parameters for the script to run.
		 */
		initialize : function(dataTable,fixedHeight,rowHeight,minRows){
			this.dataTable = dataTable.dataTable();
			this.minRows = minRows;
			this.rowHeight = rowHeight;
			this.fixedHeight = fixedHeight;
		},

		/*
		 * Resizes the table with the maximum amount of rows to fill the viewport.
		 */
		autoHeightResize : function(){
			var rows = this.calculateRows();
			if(rows<this.minRows) rows=this.minRows;
			var oSettings = this.dataTable.fnSettings();
			oSettings._iDisplayLength = rows;
			this.dataTable.fnDraw();
		},

		/*
		 * Calculates the amount of rows to fill the viewport.
		 */
		calculateRows : function (){
			var windowHeight = $(window).height();
			if(windowHeight<this.fixedHeight) return 0;
			var availableHeight = windowHeight - this.fixedHeight;
			var rows = Math.floor(availableHeight/this.rowHeight);
			return rows;
		}
	}
}
