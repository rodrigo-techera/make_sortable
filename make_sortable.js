let draggingTarget = false;
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
			
			container.addEventListener('dragstart', function (e) {
				if(e.target.draggable) {
					e.dataTransfer.setData('text/html', null);
					e.dataTransfer.effectAllowed = 'move';

					draggingTarget = e.target;
					draggingTarget.previousDisplay = draggingTarget.style.display;
				}
			}, true);

			container.addEventListener('dragend', function (e) {
				if(this == e.target) {
					this.classList.remove(this.sortable.overContainerClass);

					draggingTarget.style.display = draggingTarget.previousDisplay;
					draggingTarget = false;
				}
			}, false);

			container.addEventListener('dragleave', function (e) {
				if(this == e.target) {
					this.classList.remove(this.sortable.overContainerClass);
				}
			}, false);

			container.addEventListener('drop', function (e) {
				//pass
			}, false);

			container.addEventListener('dragover', function (e) {
				e.preventDefault(); //allowing drop event
				
				if(draggingTarget) {
					this.classList.add(this.sortable.overContainerClass);
					
					if(e.target.draggable && e.target != draggingTarget) {
						//dragging over sortable element
						const refPoint = elementPosition(e.target).top + Math.round(e.target.clientHeight/2);
						if(e.clientY >= refPoint) {
							//insert element after
							if(e.target.nextSibling != draggingTarget) {
								e.target.parentNode.insertBefore(draggingTarget, e.target.nextSibling);
							}
						} else {
							//insert element before
							if(e.target.previousSibling != draggingTarget) {
								e.target.parentNode.insertBefore(draggingTarget, e.target);
							}
						}
					}
				}
			}, false);

			[].slice.call(container.children).forEach(element => {
				element.draggable = true;
				element.sortableContainer = container;
			});
		});
	}
}

function elementPosition(element) {
	var rect = element.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	return {	top: rect.top + scrollTop,
				left: rect.left + scrollLeft };
}