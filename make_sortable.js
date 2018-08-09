document.addEventListener('DOMContentLoaded', function() {
	let draggingTarget = false;
	let tempElement = false;

	document.addEventListener('dragstart', function (e) {
		if(e.target.draggable) {
			e.dataTransfer.setData('text/html', null);

			tempElement = e.target.cloneNode(true);
			
			draggingTarget = e.target;
			draggingTarget.previousDisplay = draggingTarget.style.display;
			draggingTarget.style.display = 'none';


		}
	}, false);

	document.addEventListener('dragover', function (e) {
		e.preventDefault(); //allowing drop event

		if(draggingTarget) {
			//draggingTarget.style.top = (e.clientY||e.pageY) - Math.round(draggingTarget.offsetHeight/2);
			//draggingTarget.style.left = (e.clientX||e.pageX) - Math.round(draggingTarget.offsetWidth/2);

			if(typeof e.target.sortable !== 'undefined') {
				//dragging over sortable container
				e.target.classList.add(e.target.sortable.overContainerClass);
			} else if(typeof e.target.parentNode.sortable !== 'undefined' && e.target != tempElement) {
				//dragging over sortable element
				
				const refPoint = elementPosition(e.target).top + Math.round(e.target.clientHeight/2);
				if(e.clientY >= refPoint) {
					//insert placeholder after
					if(typeof e.target.nextSibling != tempElement) {
						e.target.parentNode.insertBefore(tempElement, e.target.nextSibling);
					}
				} else {
					//insert placeholder before
					if(typeof e.target.previousSibling != tempElement) {
						e.target.parentNode.insertBefore(tempElement, e.target);
					}
				}
			}
		}
	}, false);

	document.addEventListener('dragend', function (e) {
		draggingTarget.parentNode.classList.remove(draggingTarget.parentNode.sortable.overContainerClass);

		draggingTarget.style.display = draggingTarget.previousDisplay;
		draggingTarget = false;
		tempElement = false;
	}, false);

	document.addEventListener('drop', function (e) {
		e.preventDefault();

		let sortableContainer = false;
		if(typeof e.target.sortable !== 'undefined')
			sortableContainer = e.target;
		else if(typeof e.target.parentNode.sortable !== 'undefined')
			sortableContainer = e.target.parentNode;

		if(sortableContainer) {
			sortableContainer.insertBefore(draggingTarget, tempElement);
			sortableContainer.removeChild(tempElement);
		}
	}, false);
});

function elementPosition(element) {
	var rect = element.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	return {	top: rect.top + scrollTop,
				left: rect.left + scrollLeft };
}

function makeSortable(options_param) {
	const options = {
		container : false,
		containerClass: 'sortableContainer',
		overContainerClass: 'overSortableContainer',
		...options_param
	};

	if(options.container) {
		document.querySelectorAll(options.container).forEach(container => {
			container.sortable = options;
			container.classList.add(options.containerClass);
			
			[].slice.call(container.children).forEach(element => {
				element.draggable = true;
			});
		});
	}
}