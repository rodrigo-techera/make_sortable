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

			[].slice.call(container.children).forEach(element => {
				element.draggable = true;
				element.sortableContainer = container;

				element.addEventListener('dragover', function (e) {
					e.preventDefault(); //allowing drop event
					
					if(draggingTarget) {
						//dragHandler.style.top = (e.clientY||e.pageY) - Math.round(dragHandler.offsetHeight/2);
						//dragHandler.style.left = (e.clientX||e.pageX) - Math.round(dragHandler.offsetWidth/2);

						this.parentNode.classList.add(this.parentNode.sortable.overContainerClass);
						
						if(this != draggingTarget) {
							//dragging over sortable element
							const refPoint = elementPosition(this).top + Math.round(this.clientHeight/2);
							if(e.clientY >= refPoint) {
								//insert placeholder after
								if(this.nextSibling != draggingTarget) {
									this.parentNode.insertBefore(draggingTarget, this.nextSibling);
								}
							} else {
								//insert placeholder before
								if(this.previousSibling != draggingTarget) {
									this.parentNode.insertBefore(draggingTarget, this);
								}
							}
						}
					}
				}, false);
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