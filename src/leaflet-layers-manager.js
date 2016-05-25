L.Control.LeafletLayerManager = L.Control.extend({

	/**
	 *
	 */
	_map: null,

	/**
	 *
	 */
	_path: [],

	/**
	 *
	 */
	options: {
		layers: [],
		position: "topright",
		expand: false,
		prefix: "llm-",
		closed: 0,
		opened: 1,
		indeterminate: 2
	},

	/**
	 *
	 */
	_resources: {

		/**
		 *
		 */
		openedFolder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxZTY3MTA5MC1hZjYzLTdiNGUtOTNkZi0xNDA2NzM0MGM4NzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0MzMENFRDAwNjVBMTFFNjk4NjBDQTY0NDQzNDRFNTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0MzMENFQ0YwNjVBMTFFNjk4NjBDQTY0NDQzNDRFNTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWU2NzEwOTAtYWY2My03YjRlLTkzZGYtMTQwNjczNDBjODcxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFlNjcxMDkwLWFmNjMtN2I0ZS05M2RmLTE0MDY3MzQwYzg3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppn4DzkAAADRSURBVHjaYgytO8wAA+zs7P8Z0MDPnz8ZGfAAFmTNi6tMMRTEtp3+j88QJmTNQMUM158xoNAgcZA8Ngw2AeSFmNZT/0Hg2tP//0FsdBobAIkDtf9nQnZO24LTDFUJphg0NpfBACPUJJIAzPAl1WaQQMQWeNgAyGaQJgaGU6iBCDbkKAPYefhokM0YsQCKIpDJsdYMDGfuMzCYKOKngV6GugItHYAAIc0gmoHBlGEJejqAuUJTijhDkF3BCEvK2JIxPgAzgAU5za9usiU5SgECDABfXLSfI1ydkQAAAABJRU5ErkJggg==',

		/**
		 *
		 */
		closedFolder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxZTY3MTA5MC1hZjYzLTdiNGUtOTNkZi0xNDA2NzM0MGM4NzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzdCNjBFNjAwNjVBMTFFNjgxMjRGN0ZEREE3RjMyOTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzdCNjBFNUYwNjVBMTFFNjgxMjRGN0ZEREE3RjMyOTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWU2NzEwOTAtYWY2My03YjRlLTkzZGYtMTQwNjczNDBjODcxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFlNjcxMDkwLWFmNjMtN2I0ZS05M2RmLTE0MDY3MzQwYzg3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn5VmowAAACESURBVHjaYgytO8wAAuzs7P8Z0MDPnz8ZGfCAVY02DCwwzVUJpgxn7jMwmCgywOm2Baf/EzKECZdmEA0SB8ljw3ATYlpP/ScVgPQAtYKYEC+AwPVnDFhdgY1G8QKMQaxmEI3VAGI1j7oA0wWM0DglGSypNgMlBEYGaF74Tw4GJSSAAAMAljrCyVmAZpsAAAAASUVORK5CYII=',

		/**
		 *
		 */
		information: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAA4JGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMDUtMjVUMTM6NDE6MDEtMDM6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wNS0yNVQxMzo0MToyOS0wMzowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDUtMjVUMTM6NDE6MjktMDM6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6NTUxZWY5MmEtMzUxYS00ZjRlLWI3YTQtMzgyMDI1NzM1ZjViPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOjU1MWVmOTJhLTM1MWEtNGY0ZS1iN2E0LTM4MjAyNTczNWY1YjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjU1MWVmOTJhLTM1MWEtNGY0ZS1iN2E0LTM4MjAyNTczNWY1YjwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1NTFlZjkyYS0zNTFhLTRmNGUtYjdhNC0zODIwMjU3MzVmNWI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDUtMjVUMTM6NDE6MDEtMDM6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTM8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTM8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PqoDFf4AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAixJREFUeNp80VtI03EAxfHvzz+6pmxuXjCXEy8spTE1J5JGxdLIEKESWRZhUBhFDpEMqoGXwAcvkCa6FIwoGZWGLzXICguk8pJRIaYZQpE5k+nMknRbL9ntoc/zOS/nCEwVIPnB9BxI/sakTH1xZkrcNm1IYKhC5luccbom7z6ZHBh5NnEdeMOGEARZVTA9i1qruVBdbrYWZ8URwG8uN6iV4Ogfo9BqP77gdLcJUsoJWR9cY6u1nC0wKPhTWdMwc+4Vrlq3APBi6jNp+XWZghRLamlZ0XDN4VTkwHcPSBJIQO/jd0RqgtkYG4oPkElQcM52R0TlWK60Xaw9sidBxooPPF7wrHqobhmk/eY49zv3khqnZPYbhMuhoqVrTBjMFUP21kqjXg1zyxAUAO8/LlLeOMBXlYbLJxMJUwpcSxCtBEu9fUTE5JY9ctxo2K4Lgk+L4AOiFNDR5+TB6wU6T+mYmIcgGQTLYfOOA81CCjecvtb3sq5wE7x1gRAQrwKztZ+H90ax1e8mIz0azTqovD1KVb4+XgD+MaZjI47edn2iBOPzoFVB2v4uRnte4RgsIccYRsfTGY5mp5Ww9KFZ/FxXEZle0N3cdmmXKTkCFdA1uIzH6yY9KYy61h5sZ06U4nE2Aoi/jkFdutVcVKRLNCRk5+XKDxkjOG9//qXmoNEEDK2l/in9EgWB+ywtt5pU2mSq82IFfl7wev5bWpNBqG4nrqkGfKvL+HwA/BgAszu73GUSZgIAAAAASUVORK5CYII='

	},

	/**
	 *
	 */
	initialize: function (options) {

		if ((!window.L) || (window.L.version.match(/0\.[7-9]\.\d+/) === null)) {
			throw Error("Leaflet is not defined or you are using a version after 0.[7-9].x");
		}

		if (!window.L.GeoJSON.AJAX) {
			throw Error("Leaflet AJAX is not define. Version required is 2.0.0");
		}

		if (!window.jscolor) {
			throw Error("JSColor is not defined!");
		}

		if (!options) {
			throw Error("Please... provide options, dude!");
		}

		if ((!options.hasOwnProperty('layers')) && (!(options.layers instanceof Array)) && (options.layers.length <= 0)) {
			throw Error("Please... at least layers! We need them!");
		}

		L.Util.setOptions(this, options);

	},

	/**
	 *
	 */
	onAdd: function (map) {

		this._map = map;

		// Invisible Container ---
		var invisibleContainer = L.DomUtil.create('div', this._classBuilder('invisible-container') + ' leaflet-control');

		L.DomEvent.disableClickPropagation(invisibleContainer);
		L.DomEvent.on(invisibleContainer, "wheel", L.DomEvent.stopPropagation);

		invisibleContainer.setAttribute("aria-haspopup", true);

		// Toggler ---
		var toggler = L.DomUtil.create('div', this._classBuilder('layers-toggler'), invisibleContainer);

		toggler.setAttribute('id', 'llm-toggler');

		L.DomEvent.on(toggler, "click", function () {

			this._onToggleEffect(document.getElementById('llm-layers'), this._classBuilder('layers-container-hidden'), 300, true);

		}.bind(this));

		// Layers ---
		var layers = L.DomUtil.create('div', this._classBuilder('layers-container'), invisibleContainer);

		layers.setAttribute('id', 'llm-layers');

		try {

			this._treeBuilder(layers, {
				name: 'Camadas',
				children: this.options.layers
			});

			//setTimeout(this._applyColorPicker, 1000);

		} catch (error) {

			invisibleContainer.innerHTML = error.message;

			invisibleContainer.className += ' ' + this._classBuilder('error');

		}

		return invisibleContainer;

	},

	/**
	 *
	 */
	_classBuilder: function (classSuffix) {

		var classes = Array.prototype.slice.call(arguments);

		return classes.map(function (c) {

			return this.options.prefix + c;

		}.bind(this)).join(' ');

	},

	/**
	 *
	 */
	_treeBuilder: function (container, branch) {

		if (branch instanceof Array) {

			for (var index in branch) {

				var node = branch[index];

				if (this._isFolder(node)) {

					if (!this._hasFolderRequirements(node)) {

						throw new Error('[LLM] :: Tree node does not matches a folder requirement -> ' + JSON.stringify(node).substr(0, 30) + '...');

					}

					this._path.push(index);

					this._treeBuilder(this._folderRenderer(container, node), node.children);

				} else {

					if (!this._hasLayerRequirements(node)) {

						throw new Error('[LLM] :: Tree node does not matches a layer requirement -> ' + JSON.stringify(node).substr(0, 30) + '...');

					}

					this._path.push(index);

					node.path = this._path.slice(0).join(',');

					this._path.pop();

					this._layerRenderer(container, node);

				}

			}

			this._path.pop();

		} else {

			this._treeBuilder(this._folderRenderer(container, branch), branch.children);

		}

	},

	/**
	 *
	 */
	_isFolder: function (node) {

		return node.hasOwnProperty('children') && node.children != null && node.children instanceof Array && node.children.length > 0;

	},

	/**
	 *
	 */
	_folderRenderer: function (container, node) {

		node.id = this._id();

		node.status = this.options.opened;

		// Toggler ---
		var folderToggler = L.DomUtil.create('div', this._classBuilder('folder-toggler'), container);

		folderToggler.setAttribute('id', 'toggler-' + node.id);

		L.DomEvent.on(folderToggler, "click", this._onTogglerClickHandler.bind(this));

		// Icon ---
		var folderIcon = L.DomUtil.create('img', this._classBuilder('folder-icon'), folderToggler);

		folderIcon.setAttribute('src', this._resources.openedFolder);
		folderIcon.setAttribute('alt', '[-]');
		folderIcon.setAttribute('title', node.name);

		// Checkbox ---
		/*var checkbox = L.DomUtil.create('input', this._classBuilder('layer-checkbox'), folderToggler);

		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('value', node.id);

		L.DomEvent.addListener(checkbox, 'click', function (event) {

			if (event.target.readOnly) {
				event.target.checked = event.target.readOnly = false;
			} else if (!event.target.checked) {
				event.target.readOnly =event.target.indeterminate = true;
			}

			console.log('coco');

			//event.preventDefault();
			event.stopPropagation();

		}, this);*/

		// Label ---
		var folderLabel = L.DomUtil.create('label', this._classBuilder('folder-label'), folderToggler);

		folderLabel.innerHTML = node.name;

		// Folder Container ---
		var folderContainer = L.DomUtil.create('div', this._classBuilder('folder-container', 'folder-visible'), container);

		folderContainer.setAttribute('ref', 'toggler-' + node.id);

		return folderContainer;

	},

	/**
	 *
	 */
	_layerRenderer: function (container, node) {

		this._loadGeoJSON(node);

		// Wrapper ---
		var wrapper = L.DomUtil.create('div', this._classBuilder('layer-wrapper'), container);

		// Color ---
		var color = L.DomUtil.create('span', this._classBuilder('layer-legend'), wrapper);

		color.style.backgroundColor = this._hex2rgba(node.color, node.opacity);
		color.style.border = '1px solid ' + node.color;

		color.setAttribute('data-path', node.path);

		color.jscolor = new jscolor(color, {
			valueElement: null,
			value: node.color,
			hash: true,
			closable: true,
			closeText: 'X',
			bind: this,
			onFineChange: function () {
				this.bind._onColorChange.call(this.bind, this.targetElement, this.toHEXString());
			}
		});

		L.DomEvent.on(color, 'click', function (event) {

			event.target.jscolor.show();

		}, this);

		// Checkbox ---
		var checkbox = L.DomUtil.create('input', this._classBuilder('layer-checkbox'), wrapper);

		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('title', node.name);
		checkbox.setAttribute('value', node.path);

		if (node.included === true) {

			checkbox.checked = true;

		}

		L.DomEvent.on(checkbox, 'change', function (event) {

			var layer = this._getLayer(event.target.value);

			if (event.target.checked === false) {

				this._map.removeLayer(layer);

			} else {

				layer.addTo(this._map);

			}

		}.bind(this));

		// Label ---
		var label = L.DomUtil.create('label', this._classBuilder('layer-label'), wrapper);

		label.setAttribute('for', 'llm-c-l-' + node.id);
		label.setAttribute('title', '...');

		label.innerHTML = this._onStripText(node.name); 
		label.title = node.name;

		L.DomEvent.on(label, 'click', function (event) {

			if ((this.node.hasOwnProperty('properties')) && (this.node.properties instanceof Object)) {

				var lis = [];

				for (var property in this.node.properties) {

					var value = this.node.properties[property];

					if (typeof(value) === 'string') {

						lis.push('<li><b>' + property + ':</b>&nbsp;<span>' + value + '</span></li>');

					} else {

						lis.push('<li><b>' + property + ':</b>&nbsp;<span>' + JSON.stringify(value) + '</span></li>');

					}

				}

				var center = this.node.leafletLayer.getBounds().getCenter();

				L.popup().setLatLng(center).setContent('<ul>' + lis.join('\n') + '</ul>').openOn(this.llm._map);

			}

		}.bind({
			llm: this,
			node: node
		}));

		// Transparency
		var slider = L.DomUtil.create('input', this._classBuilder('layer-slider'), wrapper);

		slider.setAttribute('type', 'range');
		slider.setAttribute('min', 0.1);
		slider.setAttribute('max', 1.0);
		slider.setAttribute('step', 0.05);
		slider.setAttribute('value', node.opacity);
		slider.setAttribute('data-path', node.path);

		L.DomEvent.addListener(slider, 'input', function (event) {

			var layer = this._getLayer(event.target.dataset.path, true);

			var value = event.target.value;

			layer.leafletLayer.setStyle({
				fillOpacity: value,
				opacity: value
			});

			layer.fillOpacity = value;
			layer.opacity = value;

		}, this);

		// Order ---
		var zIndexDown = L.DomUtil.create('span', this._classBuilder('layer-zindex-action'), wrapper);

		zIndexDown.innerHTML = '&#9660;';

		zIndexDown.setAttribute('data-path', node.path);

		L.DomEvent.on(zIndexDown, 'click', function (event) {

			this._getLayer(event.target.dataset.path).bringToBack();

		}.bind(this));

		var zIndexUp = L.DomUtil.create('span', this._classBuilder('layer-zindex-action'), wrapper);

		zIndexUp.innerHTML = '&#9650;';

		zIndexUp.setAttribute('data-path', node.path);

		L.DomEvent.on(zIndexUp, 'click', function (event) {

			this._getLayer(event.target.dataset.path).bringToFront();

		}.bind(this));


	},

	/**
	 *
	 */
	_id: function () {

		return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 10);

	},

	/**
	 *
	 */
	_onTogglerClickHandler: function (event) {

		event.preventDefault();
		event.stopPropagation();

		var toggler = event.target.parentNode;

		var content = toggler.nextSibling;

		var className = content.className;

		var classHidden = this._classBuilder('folder-container-hidden');

		this._onToggleEffect(content, classHidden, null, false);

		toggler.children[0].src = (className.indexOf(classHidden) > 0) ? this._resources.openedFolder : this._resources.closedFolder;

	},

	/**
	 *
	 */
	_onToggleEffect: function (target, toggleClass, duration, block) {

		if (target.className.indexOf(toggleClass) >= 0) {

			if (block === true) {

				target.style.display = 'block';

			}

			setTimeout(function () {

				target.className = target.className.replace(new RegExp('\\s+' + toggleClass, 'g'), '');

			}, 0);

		} else {

			target.className += ' ' + toggleClass;

			if (block === true) {

				setTimeout(function () {

					target.style.display = 'none';

				}, duration);

			}

		}

	},

	/**
	 *
	 */
	_hex2rgba: function (hex, opacity) {

		return 'rgba(' + parseInt(hex.substring(1, 3), 16) + ', ' + parseInt(hex.substring(3, 5), 16) + ', ' + parseInt(hex.substring(5, 7), 16) + ', ' + opacity || 1.0 + ')';

	},

	/**
	 *
	 */
	_loadGeoJSON: function (node) {

		// set style in this .options (constructor)

		var style = {
			stroke: false,
			color: node.color,
			opacity: node.opacity,
			fill: true,
			fillColor: node.color,
			fillOpacity: node.opacity,
			lineCap: 'square',
			lineJoin: 'miter',
			clickable: null,
			pointerEvents: null
		};

		var type = typeof(node.url);

		if (type === 'string') {

			if (L.GeoJSON.AJAX) {

				node.leafletLayer = new L.GeoJSON.AJAX(node.url, {

					middleware: function (data) {

						if ((data.hasOwnProperty('properties')) && (data.properties instanceof Object)) {

							this.properties = data.properties;

						}

						return data;

					}.bind(node)

				});

				node.leafletLayer.on('data:loaded', function (event) {

					node.loaded = true;

					event.target.options = style; 

					event.target.setStyle(event.target.options);

				});

				if (node.included === true) {

					node.leafletLayer.addTo(this._map);

				}

			}

		} else if (type === 'object') {

			node.leafletLayer = L.geoJson(node.url, style);

			node.loaded = true;

			if ((node.url.hasOwnProperty('properties')) && (node.url.properties instanceof Object)) {

				node.properties = node.url.properties;

			}

			if (node.included === true) {

				node.leafletLayer.addTo(this._map);

			}

		}

	},

	/**
	 *
	 */
	_onStripText: function (name) {

		return (name.length > 14) ? name.substr(0, 11) + '...' : name;

	},

	/**
	 *
	 */
	_hasFolderRequirements: function (node) {

		return node.hasOwnProperty('name') &&
			typeof(node.name) === 'string' &&
			node.name.length > 0 &&
			this._isFolder(node);

	},

	/**
	 *
	 */
	_hasLayerRequirements: function (node) {

		return node.hasOwnProperty('name') &&
			typeof(node.name) === 'string' &&
			node.name.length > 0 &&
			node.hasOwnProperty('color') &&
			typeof(node.color) === 'string' &&
			node.color.length === 7 &&
			node.color[0] === '#' &&
			node.hasOwnProperty('opacity') &&
			typeof(node.opacity) === 'number' &&
			node.opacity > 0 &&
			node.opacity <= 1.0 &&
			node.hasOwnProperty('included') &&
			typeof(node.included) === 'boolean' &&
			node.hasOwnProperty('url') &&
			(
				typeof(node.url) === 'string' &&
				node.url.length > 0 &&
				node.url.match(/^https?/) !== null
			) || (
				typeof(node.url) === 'object'
			)

	},

	/**
	 *
	 */
	_getLayer: function (path, returnConfiguration) {

		if (!path) {

			return null;

		}

		var parts = path.split(',');

		var reference = this.options.layers[parts.splice(0, 1)];

		for (var index in parts) {

			reference = reference.children[parts[index]];

		}

		return (returnConfiguration === true) ? reference : reference.leafletLayer;

	},

	/**
	 *
	 */
	_onColorChange: function (target, color) {

		var layer = this._getLayer(target.dataset.path, true);

		target.style.backgroundColor = this._hex2rgba(color, layer.opacity);
		target.style.border = '1px solid ' + color;

		layer.leafletLayer.setStyle({
			color: color,
			fillColor: color
		});

		layer.color = color;
		layer.fillColor = color;

	}


});